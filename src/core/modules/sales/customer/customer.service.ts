import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { validateAndFormatRut } from '../../../../shared/utils/rut/rut.util';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const formattedRut = validateAndFormatRut(createCustomerDto.rut);
    if (formattedRut === false) {
      throw new BadRequestException('Invalid RUT');
    }
    createCustomerDto.rut = formattedRut;
    const newCustomer = this.customerRepository.create(createCustomerDto);
    try {
      return await this.customerRepository.save(newCustomer);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('A customer with this RUT already exists.');
      }
      throw error;
    }
  }

  findAll() {
    return this.customerRepository.find({ relations: ['addresses', 'addresses.commune'] });
  }

  findDeleted() {
    return this.customerRepository.find({
      where: { deletedAt: Not(IsNull()) },
      relations: ['addresses', 'addresses.commune'],
      withDeleted: true,
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id: id }, relations: ['addresses', 'addresses.commune'] });
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.customerRepository.softDelete(id);
  }
}
