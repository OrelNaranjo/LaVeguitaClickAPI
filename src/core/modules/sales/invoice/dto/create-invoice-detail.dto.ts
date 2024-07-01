import { IsNumber, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateInvoiceDetailDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsDecimal()
  @IsNotEmpty()
  cost: number;

  @IsDecimal()
  @IsNotEmpty()
  total: number;
}
