import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    try {
      return await this.productRepository.save(newProduct);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('A product with this SKU already exists.');
      }
      throw error;
    }
  }

  findAll() {
    return this.productRepository.find({ relations: ['categories', 'images', 'stocks'] });
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id: id }, relations: ['categories', 'images'] });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.softDelete(id);
  }
}
