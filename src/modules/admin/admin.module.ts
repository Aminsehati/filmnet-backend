import { CategorySchema } from './../category/category.schema';
import { UserService } from './../user/user.service';
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { HashUtils } from "src/common/utils/hash-utils";
import { AdminSchema } from "./admin.schema";
import { AdminController } from "./controllers/admin.controller";
import { AdminAuthController } from "./controllers/auth.controller";
import { AdminUserController } from "./controllers/user.controller";
import { AdminAccessTokenStrategy } from "./guard/access-token.strategy";
import { AdminGuard } from "./guard/admin.guard";
import { AdminService } from "./services/admin.service";
import { UserSchema } from '../user/schema/user.schema';
import { AdminSubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from '../subscription/subscription.service';
import { SubscriptionSchema } from '../subscription/subscription.schema';
import { AdminCategoryController } from './controllers/category.controller';
import { CategoryService } from '../category/category.service';
import { PublicUtils } from 'src/common/utils/public-utils';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature([
            {
                name: "admins",
                schema: AdminSchema
            },
            {
                name: "users",
                schema: UserSchema
            },
            {
                name: "subscriptions",
                schema: SubscriptionSchema
            },
            {
                name: "categories",
                schema: CategorySchema
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('ADMIN_ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: configService.get('ADMIN_ACCESS_TOKEN_EXPIRATION'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AdminAuthController, AdminController, AdminUserController, AdminSubscriptionController, AdminCategoryController],
    providers: [AdminService, HashUtils, AdminGuard, AdminAccessTokenStrategy, UserService, SubscriptionService, CategoryService, PublicUtils]
})
export class AdminModule {

}