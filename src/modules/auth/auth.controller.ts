import { Post, Get, Controller, Body, BadRequestException, Res } from '@nestjs/common'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { GetCookies } from 'src/common/decorators/get-cookie.decorator';
import { SendOtpDto } from './dto/send-otp.dto';
import { Response } from 'express'
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginUserDto } from './dto/login-user.dto';
@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(
        private authSerive: AuthService
    ) { }
    @Post('/sendOtp')
    async sendOtpByPhoneNumber(@Body() body: SendOtpDto, @GetCookies('otp_sms') otp_sms: string, @Res() res: Response) {
        if (otp_sms) {
            throw new BadRequestException('کد یکبارمصرف قبلا استفاده شده')
        }
        const { otp, sign } = await this.authSerive.sendOtp(body);
        res.cookie('otp_sms', sign, {
            expires: new Date(new Date().getTime() + 2 * 60 * 1000)
        })
        return res.json({
            success: true,
            data: {
                otp,
                sign
            }
        })
    }

    @Post('/verifyOtp')
    async verifyOtpByPhoneNumber(@Body() body: VerifyOtpDto, @GetCookies('otp_sms') otp_sms: string) {
        if (!otp_sms) {
            throw new BadRequestException('کدیکبارمصرف ارسال نشده است')
        }
        return await this.authSerive.verifyOtpByPhoneNumber(body, otp_sms);
    }

    @Post('/login')
    async loginUser(@Body() body: LoginUserDto) {
        return await this.authSerive.loginUser(body);
    }




    @ApiExcludeEndpoint()
    @Post('/oauth2-login')
    async loginOauth2(@Body() body: LoginUserDto, @Res() res: Response) {
        const data = await this.authSerive.loginUser(body);
        return res.send({
            ...data
        })
    }
}