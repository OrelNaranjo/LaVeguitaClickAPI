import { IsString, IsBoolean, IsEmail, IsArray, IsOptional } from 'class-validator';
import { CreateAddressDto } from '../../../../../shared/modules/address/dto/create-address.dto';
import { CreateContactDto } from '../../../../../shared/modules/contact/dto/create-contact.dto';

export class CreateSupplierDto {
  @IsString()
  rut: string;

  @IsString()
  company_name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsBoolean()
  is_active: boolean;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @IsArray()
  contacts: CreateContactDto[];

  @IsArray()
  address: CreateAddressDto[];
}
