import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { UserGuard } from "../auth/guard/user.guard";
import { ChangePassworUserdDto } from "./dto/change-password-user.dto";
import { UpdateProfileUserDto } from "./dto/update-profile-user.dto";
import { UserDocument } from "./schema/user.schema";
import { UserService } from "./user.service";

@Controller('/')
@ApiTags('User')
@ApiBearerAuth('access-token')
@UseGuards(UserGuard)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {

    }
    @Get('/user/profile')
    async getProfileUser(@GetUser() user: UserDocument) {
        return user
    }

    @Patch('/user/profile')
    async updateProfileUser(@GetUser() user: UserDocument, @Body() body: UpdateProfileUserDto) {
        return this.userService.updateProfileUser(user, body);
    }

    @Patch('/user/change-password')
    async changePasswordUser(@GetUser() user: UserDocument, @Body() body: ChangePassworUserdDto) {
        return this.userService.changePasswordUser(user, body);
    }
}