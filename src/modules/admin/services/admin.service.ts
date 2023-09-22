import { statusAdmin } from './../../../common/types/public.types';
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HashUtils } from "src/common/utils/hash-utils";
import { Admin, AdminDocument } from "../admin.schema";
import { LoginAdminDto } from '../dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileAdminDto } from '../dto/update-profile-admin.dto';
import { ChangePasswordAdminDto } from '../dto/change-password-admin.dto';

@Injectable()
export class AdminService {
    constructor(
        private hashUtils: HashUtils,
        @InjectModel('admins') private adminModel: Model<Admin>,
        private jwtService: JwtService
    ) {

    }
    async loginAdmin(body: LoginAdminDto) {
        console.log(body);
        const admin = await this.adminModel.findOne({
            username: body.username.toLocaleLowerCase()
        });
        if (!admin) {
            throw new BadRequestException('نام کاربری یا رمزعبور اشتباه میباشد')
        }
        const has_verify_password = await this.hashUtils.verifyString(body.password, admin.password);
        if (!has_verify_password) {
            throw new BadRequestException('نام کاربری یا رمزعبور اشتباه میباشد')
        }
        console.log(has_verify_password);
        const access_token = await this.jwtService.sign({ _id: admin._id }, {
            expiresIn: "5d"
        });
        const refresh_token = await this.jwtService.sign({ _id: admin._id }, {
            expiresIn: '10d'
        });
        return {
            access_token,
            refresh_token,
            admin
        }
    }

    async validateAdmin(id: string) {
        const admin = await this.adminModel.findOne({ _id: id });
        return admin
    }
    async updateProfileAdmin(admin: AdminDocument, body: UpdateProfileAdminDto) {
        await this.adminModel.updateOne({ _id: admin._id }, {
            ...body
        })
        return await this.adminModel.findOne({ _id: admin._id })
    }
    async changePasswordAdmin(admin: AdminDocument, body: ChangePasswordAdminDto) {
        if (body.password !== body.confirm_password) {
            throw new BadRequestException('رمزعبور و تکراررمزعبور یکسان نمیباشد')
        }
        const password = await this.hashUtils.hashString(body.password);
        await this.adminModel.updateOne({ _id: admin._id }, {
            password
        })
        return await this.adminModel.findOne({ _id: admin._id })
    }
}