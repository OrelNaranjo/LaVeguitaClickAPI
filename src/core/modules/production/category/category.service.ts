import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Create category
  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  // Find all categories with children
  findAll() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.childrens', 'childrens')
      .leftJoinAndSelect('childrens.image', 'childrensImage')
      .leftJoinAndSelect('category.image', 'image')
      .where('category.parentId IS NULL')
      .getMany();
  }

  // Find all categories with children only active
  findAllActive() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.childrens', 'childrens', 'childrens.is_active = true')
      .leftJoinAndSelect('category.image', 'image')
      .where('category.parentId IS NULL')
      .andWhere('category.is_active = true')
      .getMany();
  }

  // Find category by id
  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id: id }, relations: ['children', 'image', 'parent'] });
  }

  // Update category
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  // Remove category
  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
