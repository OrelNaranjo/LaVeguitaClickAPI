import { Type } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/entities/category.entity';
import { Image } from '../../../../../shared/modules/image/entities/image.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  barcode: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsDecimal()
  weight_kg: number;

  @ApiProperty({ type: () => [Category] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Category)
  categories: Partial<Category>[];

  @ApiProperty({ type: () => [Image] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Partial<Image>[];
}
