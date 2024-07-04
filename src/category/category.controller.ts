import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, BadRequestException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = await this.categoryService.create(createCategoryDto);
      return { success: true, message: 'Category created successfully', data: createdCategory };
    } catch (error) {
      throw new BadRequestException('Failed to create category');
    }
  }

  @Get()
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      return { success: true, message: 'Categories fetched successfully', data: categories };
    } catch (error) {
      throw new BadRequestException('Failed to fetch categories');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoryService.findOne(id);
      return { success: true, message: `Category with ID '${id}' found`, data: category };
    } catch (error) {
      throw new NotFoundException(`Category with ID '${id}' not found`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoryService.update(id, updateCategoryDto);
      return { success: true, message: `Category with ID '${id}' updated successfully`, data: updatedCategory };
    } catch (error) {
      throw new BadRequestException(`Failed to update category with ID '${id}'`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedCategory = await this.categoryService.remove(id);
      return { success: true, message: `Category with ID '${id}' deleted successfully`, data: deletedCategory };
    } catch (error) {
      throw new NotFoundException(`Category with ID '${id}' not found`);
    }
  }
}
