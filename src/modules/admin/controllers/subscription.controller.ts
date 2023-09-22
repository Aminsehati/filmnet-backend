import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AdminGuard } from "../guard/admin.guard";
import { CreateSubscriptionByAdminDto } from 'src/modules/subscription/dto/create-subscription.dto';
import { SubscriptionService } from 'src/modules/subscription/subscription.service';
import { UpdateSubscriptionByAdminDto } from 'src/modules/subscription/dto/update-subscription.dto';

@ApiTags('Subscription')
@Controller('/admin/subscription')
@ApiBearerAuth('admin-access-token')
@UseGuards(AdminGuard)
export class AdminSubscriptionController {
    constructor(
        private subscriptionService: SubscriptionService
    ) {

    }
    @Post('/')
    async createSubscriptionByAdmin(@Body() body: CreateSubscriptionByAdminDto) {
        return this.subscriptionService.createSubscriptionByAdmin(body);
    }

    @Get('/')
    async getSubscriptionsByAdmin() {
        return this.subscriptionService.getSubscriptionsByAdmin()
    }
    @Get('/:id')
    async getSubscriptionByAdmin(@Param('id', ParseObjectIdPipe) id: string) {
        return this.subscriptionService.getSubscriptionByAdmin(id);
    }

    @Patch('/:id')
    async updateSubscriptionByAdmin(@Param('id', ParseObjectIdPipe) id: string, @Body() body: UpdateSubscriptionByAdminDto) {
        return this.subscriptionService.updateSubscriptionByAdmin(id,body);
    }
}