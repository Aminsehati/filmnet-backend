import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { HashUtils } from "src/common/utils/hash-utils";
import { AuthModule } from "../auth/auth.module";
import { UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

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
        AuthModule
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule { }