import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateAndFormatRut } from '../../../../shared/utils/rut/rut.util';
import { CreateEmployeeDetailDto } from './dto/create-employee-detail.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDetailDto } from './dto/update-employee-detail.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeDetail } from './entities/employee-detail.entity';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeDetail)
    private employeeDetailRepository: Repository<EmployeeDetail>,
  ) {}

  // Create a new employee
  async create(createEmployeeDto: CreateEmployeeDto) {
    const formattedRut = validateAndFormatRut(createEmployeeDto.run);
    if (formattedRut === false) {
      throw new BadRequestException('Invalid RUN');
    }
    createEmployeeDto.run = formattedRut;

    const newEmployee = this.employeeRepository.create(createEmployeeDto);

    try {
      return await this.employeeRepository.save(newEmployee);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('A user with this RUN already exists.');
      }
      throw error;
    }
  }

  // Create a new employee details
  async createDetail(employeeId: number, createEmployeeDetailDto: CreateEmployeeDetailDto) {
    const employee = await this.employeeRepository.findOneBy({ id: employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    const newEmployeeDetail = this.employeeDetailRepository.create(createEmployeeDetailDto);
    newEmployeeDetail.employee = employee;
    return this.employeeDetailRepository.save(newEmployeeDetail);
  }

  // Retrieve all employees
  findAll() {
    return this.employeeRepository.find({ relations: ['employeeDetails', 'addresses'] });
  }

  // Retrieve a single employee and its details
  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id: id }, relations: ['employeeDetails', 'addresses', 'addresses.commune'] });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  // Update an employee
  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  // Update an detail employee
  async updateDetail(id: number, updateEmployeeDetailDto: UpdateEmployeeDetailDto) {
    const employeeDetail = await this.employeeDetailRepository.findOne({ where: { id: id } });
    if (!employeeDetail) {
      throw new NotFoundException(`Employee Detail with ID ${id} not found`);
    }
    return this.employeeDetailRepository.update(id, updateEmployeeDetailDto);
  }

  // Remove an employee and its details
  async remove(id: number) {
    const employee = await this.employeeRepository.findOneBy({ id: id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return this.employeeRepository.update(id, { is_deleted: true });
  }
}
