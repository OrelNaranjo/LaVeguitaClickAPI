import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  alt: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  categoryId: number;
}
