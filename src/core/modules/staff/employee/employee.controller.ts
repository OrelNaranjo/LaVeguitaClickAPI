import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEmployeeDetailDto } from './dto/create-employee-detail.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDetailDto } from './dto/update-employee-detail.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Post(':id/detail')
  createDetail(@Param('id') id: string, @Body() createEmployeeDetailDto: CreateEmployeeDetailDto) {
    return this.employeeService.createDetail(+id, createEmployeeDetailDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Patch(':id/detail')
  updateDetail(@Param('id') id: string, @Body() updateEmployeeDetailDto: UpdateEmployeeDetailDto) {
    return this.employeeService.updateDetail(+id, updateEmployeeDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
