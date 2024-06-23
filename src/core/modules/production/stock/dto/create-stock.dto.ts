import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStockDto {
  @IsOptional()
  @IsNumber()
  min_stock?: number;

  @IsOptional()
  @IsNumber()
  max_stock?: number;

  @IsNotEmpty()
  @IsNumber()
  warehouse_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
