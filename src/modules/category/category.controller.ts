import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";

@ApiTags('Category')
@Controller('/category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) {

    }
    @Get('/')
    async getCategories() {
        return await this.categoryService.getCategories()
    }
}