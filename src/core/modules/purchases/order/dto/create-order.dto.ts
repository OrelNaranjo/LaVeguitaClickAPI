import { Supplier } from './../../supplier/entities/supplier.entity';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from '../../../production/product/entities/product.entity';
import { Employee } from '../../../staff/employee/entities/employee.entity';

class CreateOrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  product: Product;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  orderNumber: number;

  @IsNotEmpty()
  @IsNumber()
  employee: Employee;

  @IsNotEmpty()
  @IsNumber()
  supplier: Supplier;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsDate()
  date: Date;

  @IsNumber()
  total: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  orderDetails: CreateOrderDetailDto[];
}
