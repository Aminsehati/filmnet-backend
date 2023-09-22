import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { HashUtils } from "src/common/utils/hash-utils";
import { OtpUtils } from "src/common/utils/otp-utils";
import { UserSchema } from "../user/schema/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserAccessTokenStrategy } from "./guard/access-token.strategy";
import { UserGuard } from "./guard/user.guard";
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature([
            {
                name: "users",
                schema: UserSchema
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('USER_ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: configService.get('USER_ACCESS_TOKEN_EXPIRATION'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [UserAccessTokenStrategy, AuthService, HashUtils, OtpUtils],
    exports: [
        AuthService,
        HashUtils,
        OtpUtils,
    ]
})
export class AuthModule {

}