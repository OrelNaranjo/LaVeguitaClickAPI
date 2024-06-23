import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  create(createWarehouseDto: CreateWarehouseDto) {
    const warehouse = this.warehouseRepository.create(createWarehouseDto);
    return this.warehouseRepository.save(warehouse);
  }

  findAll() {
    return this.warehouseRepository.find();
  }

  async findAllProductByWarehouse(id: number) {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id: id },
      relations: ['stocks', 'stocks.product'],
    });

    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    // Formatear los datos
    const formattedWarehouse = {
      id: warehouse.id,
      name: warehouse.name,
      capacity_kg: warehouse.capacity_kg,
      used_capacity_kg: warehouse.used_capacity_kg,
      products: warehouse.stocks.map((stock) => ({
        ...stock.product,
        stock: stock.stock,
        min_stock: stock.min_stock,
        max_stock: stock.max_stock,
      })),
    };

    return formattedWarehouse;
  }
  findOne(id: number) {
    return this.warehouseRepository.findOneBy({ id: id });
  }

  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseRepository.update(id, updateWarehouseDto);
  }

  remove(id: number) {
    return this.warehouseRepository.delete(id);
  }
}
