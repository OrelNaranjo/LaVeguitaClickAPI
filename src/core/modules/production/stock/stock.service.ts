import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { Warehouse } from '../warehouse/entities/warehouse.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createStockDto: CreateStockDto) {
    const stock = this.stockRepository.create(createStockDto);
    return this.stockRepository.save(stock);
  }

  findAll() {
    return this.stockRepository.find({ relations: ['product', 'warehouse'] });
  }

  findOne(id: number) {
    return this.stockRepository.findOneBy({ id: id });
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return this.stockRepository.update(id, updateStockDto);
  }

  async incrementStock(productId: number, warehouseId: number, quantity: number): Promise<Stock> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const warehouse = await this.warehouseRepository.findOneBy({ id: warehouseId });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${warehouseId} not found`);
    }

    let stock = await this.stockRepository.findOne({ where: { product, warehouse } });

    if (!stock) {
      stock = new Stock();
      stock.product = product;
      stock.warehouse = warehouse;
      stock.stock = 0;
      stock.max_stock = 0;
    }

    const updatedStock = stock.stock + quantity;

    if (updatedStock > stock.max_stock && stock.max_stock > 0) {
      throw new BadRequestException('Exceeded maximum stock limit');
    }

    const updatedWeight = Number(product.weight_kg) * updatedStock;
    if (updatedWeight > warehouse.capacity_kg) {
      throw new BadRequestException('Exceeded warehouse capacity');
    }

    warehouse.used_capacity_kg = Number(warehouse.used_capacity_kg || 0) + Number(product.weight_kg) * quantity;
    await this.warehouseRepository.save(warehouse);

    stock.stock = updatedStock;
    await this.stockRepository.save(stock);

    return stock;
  }

  async decrementStock(productId: number, warehouseId: number, quantity: number): Promise<Stock> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const warehouse = await this.warehouseRepository.findOneBy({ id: warehouseId });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${warehouseId} not found`);
    }

    const stock = await this.stockRepository.findOne({ where: { product, warehouse } });
    if (!stock) {
      throw new NotFoundException(`Stock not found for product ID ${productId} in warehouse ID ${warehouseId}`);
    }

    const updatedStock = stock.stock - quantity;

    if (updatedStock < 0) {
      throw new BadRequestException('Insufficient stock');
    }

    const updatedWeight = Number(product.weight_kg) * updatedStock;
    if (updatedWeight < 0) {
      throw new BadRequestException('Insufficient warehouse capacity');
    }

    warehouse.used_capacity_kg = Number(warehouse.used_capacity_kg || 0) - Number(product.weight_kg) * quantity;
    await this.warehouseRepository.save(warehouse);

    stock.stock = updatedStock;
    await this.stockRepository.save(stock);

    return stock;
  }

  remove(id: number) {
    return this.stockRepository.delete(id);
  }
}
