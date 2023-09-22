import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { CategoryService } from "src/modules/category/category.service";
import { AdminGuard } from "../guard/admin.guard";
import { CreateCategoryDto } from 'src/modules/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/modules/category/dto/update-category.dto';

@ApiTags('Category')
@Controller('/admin/category')
@ApiBearerAuth('admin-access-token')
@UseGuards(AdminGuard)
export class AdminCategoryController {
    constructor(
        private categoryService: CategoryService
    ) {

    }
    @Get('/')
    async getCategoriesByAdmin() {
        return this.categoryService.getCategoriesByAdmin();
    }

    @Get('/:id')
    async getCategoryByAdmin(@Param('id', ParseObjectIdPipe) id: string) {
        return this.categoryService.getCategoriesByAdmin();
    }

    @Post('/')
    async createCategoryByAdmin(@Body() body: CreateCategoryDto) {
        return await this.categoryService.createCategoryByAdmin(body);
    }

    @Patch('/:id')
    async updateCategoryByAdmin(@Body() body: UpdateCategoryDto, @Param('id', ParseObjectIdPipe) id: string) {
        return await this.categoryService.updateCategoryByAdmin(id, body);
    }
}