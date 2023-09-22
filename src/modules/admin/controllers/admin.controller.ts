import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetAdmin } from "src/common/decorators/get-admin.decorator";
import { AdminDocument } from "../admin.schema";
import { ChangePasswordAdminDto } from "../dto/change-password-admin.dto";
import { UpdateProfileAdminDto } from "../dto/update-profile-admin.dto";
import { AdminGuard } from "../guard/admin.guard";
import { AdminService } from "../services/admin.service";

@ApiTags('Admin')
@Controller('/admin')
@ApiBearerAuth('admin-access-token')
@UseGuards(AdminGuard)
export class AdminController {
    constructor(
        private adminService: AdminService
    ) {

    }
    @Get('/profile')
    async getAdminProfile(@GetAdmin() admin: AdminDocument) {
        return admin
    }

    @Patch('/profile')
    async updateProfileAdmin(@GetAdmin() admin: AdminDocument, @Body() body: UpdateProfileAdminDto) {
        return await this.adminService.updateProfileAdmin(admin, body);
    }

    @Patch('/change-password')
    async changePasswordAdmin(@GetAdmin() admin:AdminDocument , @Body() body:ChangePasswordAdminDto){
        return await this.adminService.changePasswordAdmin(admin,body);
    }
}