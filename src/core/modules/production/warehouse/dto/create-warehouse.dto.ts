import { IsArray, IsDecimal, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from '../../../../../shared/modules/address/dto/create-address.dto';

export class CreateWarehouseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  capacity_kg: number;

  @IsDecimal()
  used_capacity_kg: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsArray()
  address: CreateAddressDto;
}
