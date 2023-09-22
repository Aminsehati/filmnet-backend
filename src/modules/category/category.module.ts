import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { PublicUtils } from "src/common/utils/public-utils";
import { CategoryController } from "./category.controller";
import { CategorySchema } from "./category.schema";
import { CategoryService } from "./category.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature([
            {
                name: "categories",
                schema: CategorySchema
            }
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService, PublicUtils]
})
export class CategoryModule {

}