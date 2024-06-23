import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateEmployeeDetailDto } from './create-employee-detail.dto';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../../../../shared/modules/address/dto/create-address.dto';
import { IsRut } from '../../../../../shared/validators/rut/rut.validator';
import { Employee } from '../entities/employee.entity';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsRut()
  run: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  birth_date: Date;

  @IsOptional()
  manager: Employee;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeDetailDto)
  employeeDetails: CreateEmployeeDetailDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];
}
