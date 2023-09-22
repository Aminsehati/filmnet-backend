import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HashUtils } from "src/common/utils/hash-utils";
import { ChangePassworUserdDto } from "./dto/change-password-user.dto";
import { QueryUserDto } from "./dto/query-user.dto";
import { UpdateProfileUserDto } from "./dto/update-profile-user.dto";
import { UpdateUserByAdminDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schema/user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('users') private userModel: Model<User>,
        private readonly hashUtils: HashUtils
    ) {

    }
    async updateProfileUser(user: UserDocument, body: UpdateProfileUserDto) {
        return await this.userModel.updateOne({ _id: user._id }, {
            ...body
        })
    }

    async changePasswordUser(user: UserDocument, body: ChangePassworUserdDto) {
        if (body.password !== body.confirm_password) {
            throw new BadRequestException('رمزعبور و تکرار رمز عبور یکسان نمیباشد')
        }
        const password = await this.hashUtils.hashString(body.password);
        console.log(password);
        await this.userModel.updateOne({ _id: user._id }, {
            password,
            flag: "has_password"
        })
        return await this.userModel.findOne({ _id: user._id });
    }

    async getUsersByAdmin(query: QueryUserDto) {
        const { limit = 10, skip = 1, gender, status } = query
        const filter = {
            ...(gender !== undefined && {
                gender
            }),
            ...(status !== undefined && {
                status
            })
        }
        console.log({ filter })
        const items = await this.userModel.find(filter).limit(limit)
            .skip(Number(limit) * Number(skip) * (Number(skip) - 1));
        const count = await this.userModel.find().count();
        return {
            items,
            count
        }
    }
    async getUserByAdmin(id: string) {
        const user = await this.userModel.findOne({ _id: id });
        if (!user) {
            throw new NotFoundException('آیتمی یافت نشد')
        }
        return user
    }
    async updateUserByAdmin(id: string, body: UpdateUserByAdminDto) {
        const user = await this.userModel.findOne({ _id: id });
        if (!user) {
            throw new NotFoundException('آیتمی یافت نشد')
        }
        const has_phoneNumber = await this.userModel.findOne({
            phone_number: body?.phone_number
        });
        if (has_phoneNumber && body?.phone_number) {
            throw new BadRequestException('شماره واردشده قبلا ثبت شده است')
        }
        const password = await this.hashUtils.verifyString(body?.password, user.password);
        await this.userModel.updateOne({ _id: user._id }, {
            ...body,
            password: body.password ? password : user.password
        })
        return await this.userModel.findOne({ _id: user._id });
    }
}