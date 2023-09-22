import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { statusUser } from "src/common/types/public.types";
import { HashUtils } from "src/common/utils/hash-utils";
import { OtpUtils } from "src/common/utils/otp-utils";
import { User } from "../user/schema/user.schema";
import { LoginUserDto } from "./dto/login-user.dto";
import { SendOtpDto } from "./dto/send-otp.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@Injectable()
export class AuthService {
    constructor(
        private hashUtils: HashUtils,
        private otpUtils: OtpUtils,
        @InjectModel('users') private userModel: Model<User>,
        private jwtService: JwtService,
    ) {

    }
    async sendOtp(body: SendOtpDto) {
        const ttl = 2 * 60 * 1000;
        const expires = Date.now() + ttl;
        const otp = await this.otpUtils.generateOtp();
        const hash_phoneNumber = await this.hashUtils.hashString(body.phone_number);
        const hash_otp = await this.hashUtils.hashString(otp.toString());
        const sign = `${hash_phoneNumber}_${expires}_${hash_otp}`;
        return {
            sign,
            otp
        }
    }
    async verifyOtpByPhoneNumber(body: VerifyOtpDto, otp_sms: string) {
        const [hash_phoneNumber, expired, hash_otp] = otp_sms.split('_');
        const decode_phoneNumber = await this.hashUtils.verifyString(body.phone_number, hash_phoneNumber);
        const decode_otp = await this.hashUtils.verifyString(body.otp, hash_otp);
        const hasExpired = Number(expired) < Date.now();
        if (hasExpired || !decode_phoneNumber || !decode_otp) {
            throw new BadRequestException('کد یکبارمصرف وارد شده صحیح نمیباشد');
        }
        let user = await this.userModel.findOne({
            phone_number: body.phone_number
        });
        if (!user) {
            user = await this.userModel.create({
                phone_number: body.phone_number,
                status: statusUser.CONFIRMED,
            })
        }
        const access_token = await this.jwtService.sign({ _id: user._id })
        const refresh_token = await this.jwtService.sign({ _id: user._id })
        return {
            access_token,
            refresh_token,
            user
        }

    }

    async validateUser(id: string) {
        const user = await this.userModel.findOne({ _id: id });
        return user
    }
    async loginUser(body: LoginUserDto) {
        console.log(body);
        const user = await this.userModel.findOne({
            phone_number: body.username
        });
        if (!user) {
            throw new UnauthorizedException('رمز عبور یا شماره همراه اشتباه میباشد')
        }
        const has_verify_password = await this.hashUtils.verifyString(body.password, user.password);
        if (!has_verify_password) {
            throw new UnauthorizedException('رمز عبور یا شماره همراه اشتباه میباشد')
        }
        const access_token = await this.jwtService.sign({ _id: user._id })
        const refresh_token = await this.jwtService.sign({ _id: user._id });
        return {
            access_token,
            refresh_token,
            user
        }

    }
}