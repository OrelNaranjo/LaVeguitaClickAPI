import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { Response } from 'express';

@Controller('seed')
export class SeederController {
  constructor(private readonly seedService: SeederService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Res() response: Response) {
    try {
      await this.seedService.seed();
      return response.status(HttpStatus.OK).json({
        message: 'La base de datos ha sido poblada con éxito.',
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Ocurrió un error al intentar poblar la base de datos.',
        error: error.message,
      });
    }
  }
}
