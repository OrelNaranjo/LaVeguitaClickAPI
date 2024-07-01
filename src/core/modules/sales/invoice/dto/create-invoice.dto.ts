import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsNotEmpty, IsDecimal, IsArray, ValidateNested } from 'class-validator';
import { CreateInvoiceDetailDto } from './create-invoice-detail.dto';

export class CreateInvoiceDto {
  @IsDate()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @IsDecimal()
  @IsNotEmpty()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  details: CreateInvoiceDetailDto[];
}
