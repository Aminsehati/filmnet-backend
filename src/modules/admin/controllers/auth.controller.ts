import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginAdminDto } from "../dto/login-admin.dto";
import { AdminService } from "../services/admin.service";
import { Response } from 'express'

@ApiTags('Auth')
@Controller('/admin/auth')
export class AdminAuthController {
    constructor(
        private adminService: AdminService
    ) {

    }
    @Post('/login')
    async loginAdmin(@Body() body: LoginAdminDto) {
        return await this.adminService.loginAdmin(body)
    }
    @Post('/oauth2-login')
    async loginAdminOauth2(@Body() body: LoginAdminDto, @Res() res: Response) {
        const data = await this.adminService.loginAdmin(body)
        return res.send({
            ...data
        })

    }
}