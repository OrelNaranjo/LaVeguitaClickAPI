import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id: id } });
    if (!customer) {
      throw new BadRequestException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      await this.customerRepository.update(id, updateCustomerDto);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(`Failed to update customer with ID ${id}`);
    }
  }

  async remove(id: number) {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`Failed to delete customer with ID ${id}`);
    }
    return { message: `Customer with ID ${id} successfully deleted` };
  }
}
