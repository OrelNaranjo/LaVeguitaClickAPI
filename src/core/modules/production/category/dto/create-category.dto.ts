import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';
import { Category } from '../entities/category.entity';
import { Image } from '../../../../../shared/modules/image/entities/image.entity';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: () => Image })
  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  image: Partial<Image>;

  @ApiProperty({ type: () => Category })
  @IsOptional()
  @ValidateNested()
  @Type(() => Category)
  parent: Partial<Category>;

  @ApiProperty({ type: () => [Category] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Category)
  children: Partial<Category>[];

  @ApiProperty({ type: () => [Product] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Partial<Product>[];
}
