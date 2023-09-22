import { SubscriptionSchema } from './subscription.schema';
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/schema/user.schema";
import { SubscriptionController } from "./Subscription.controller";
import { SubscriptionService } from './subscription.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature([
            {
                name: "users",
                schema: UserSchema
            },
            {
                name: "subscriptions",
                schema: SubscriptionSchema
            }
        ]),
        AuthModule
    ],
    controllers: [SubscriptionController],
    providers: [SubscriptionService]
})
export class SubscriptionModule {

}