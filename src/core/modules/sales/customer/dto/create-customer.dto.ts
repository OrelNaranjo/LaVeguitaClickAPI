import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from '../../../../../shared/modules/address/dto/create-address.dto';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  rut: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  addresses: CreateAddressDto[];
}
