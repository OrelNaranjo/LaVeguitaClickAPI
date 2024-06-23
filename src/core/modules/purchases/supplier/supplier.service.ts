import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { validateAndFormatRut } from '../../../../shared/utils/rut/rut.util';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const formattedRut = validateAndFormatRut(createSupplierDto.rut);
    if (formattedRut === false) {
      throw new BadRequestException('Invalid RUT');
    }
    createSupplierDto.rut = formattedRut;
    const newSupplier = this.supplierRepository.create(createSupplierDto);
    try {
      return await this.supplierRepository.save(newSupplier);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('A user with this RUN already exists.');
      }
      throw error;
    }
  }

  findAll() {
    return this.supplierRepository.find({ relations: ['contacts', 'addresses'] });
  }

  findOne(id: number): Promise<Supplier> {
    const supplier = this.supplierRepository.findOne({ where: { id: id }, relations: ['contacts', 'addresses'] });
    if (!supplier) {
      throw new Error(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.supplierRepository.update(id, updateSupplierDto);
  }

  remove(id: number) {
    return this.supplierRepository.delete(id);
  }
}
