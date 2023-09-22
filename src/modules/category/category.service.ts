import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PublicUtils } from "src/common/utils/public-utils";
import { Category } from "./category.schema";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('categories') private categoryModel: Model<Category>,
        private publicUtils: PublicUtils
    ) {

    }

    async getCategories() {
        const items = await this.categoryModel.find();
        const count = await this.categoryModel.find().count();
        return {
            items,
            count
        }
    }
    async getCategoriesByAdmin() {
        const items = await this.categoryModel.find();
        const count = await this.categoryModel.find().count();
        return {
            items,
            count
        }
    }

    async getCategoryByAdmin(id: string) {
        const category = await this.categoryModel.findOne({ _id: id });
        if (!category) {
            throw new NotFoundException('آیتمی یافت نشد')
        }
        return category
    }
    async createCategoryByAdmin(body: CreateCategoryDto) {
        const has_title = await this.categoryModel.findOne({ title: body.title });
        if (has_title) {
            throw new BadRequestException('عنوان قبلا ثبت شده است')
        }
        const slug = await this.publicUtils.generateSlugify(body.title);
        return await this.categoryModel.create({
            ...body,
            slug
        })
    }
    async updateCategoryByAdmin(id: string, body: UpdateCategoryDto) {
        const category = await this.categoryModel.findOne({ _id: id });
        if (!category) {
            throw new NotFoundException('آیتمی یافت نشد')
        }
        const has_title = await this.categoryModel.findOne({ title: body?.title });
        if (has_title && body.title) {
            throw new BadRequestException('عنوان قبلا ثبت شده است')
        }
        const slug = await this.publicUtils.generateSlugify(body?.title);
        await this.categoryModel.updateOne({ _id: category._id }, {
            ...body,
            slug: slug ? slug : category.slug
        })
        return await this.categoryModel.findOne({ _id: category._id });
    }

}