import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetAdmin } from "src/common/decorators/get-admin.decorator";
import { ParseObjectIdPipe } from "src/common/pipes/parse-objectid.pipe";
import { QueryUserDto } from "src/modules/user/dto/query-user.dto";
import { UpdateUserByAdminDto } from "src/modules/user/dto/update-user.dto";
import { UserService } from "src/modules/user/user.service";
import { AdminDocument } from "../admin.schema";
import { AdminGuard } from "../guard/admin.guard";


@ApiTags('User')
@Controller('/admin/user')
@ApiBearerAuth('admin-access-token')
@UseGuards(AdminGuard)
export class AdminUserController {
    constructor(
        private userService: UserService
    ) {

    }
    @Get('/')
    async getUsersByAdmin(@Query() query: QueryUserDto) {
        return this.userService.getUsersByAdmin(query);
    }

    @Get('/:id')
    async getUserByAdmin(@Param('id', ParseObjectIdPipe) id: string) {
        return this.userService.getUserByAdmin(id);
    }

    @Patch('/:id')
    async updateUserByAdmin(@Param('id', ParseObjectIdPipe) id: string, @Body() body: UpdateUserByAdminDto) {
        return await this.userService.updateUserByAdmin(id, body);
    }
}