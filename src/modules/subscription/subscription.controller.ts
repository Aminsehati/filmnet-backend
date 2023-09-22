import { ParseObjectIdPipe } from './../../common/pipes/parse-objectid.pipe';
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "../auth/guard/user.guard";
import { SubscriptionService } from "./subscription.service";

@ApiTags('Subscription')
@Controller('/subscription')
@ApiBearerAuth('access-token')
@UseGuards(UserGuard)
export class SubscriptionController {
    constructor(
        private subscriptionService: SubscriptionService
    ) {

    }
    @Get('/')
    async getSubscriptions() {
        return await this.subscriptionService.getSubscriptions()
    }
}