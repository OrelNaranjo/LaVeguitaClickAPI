import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Employee } from '../../../../core/modules/staff/employee/entities/employee.entity';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsString()
  zip_code: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  employee: Employee;
}
