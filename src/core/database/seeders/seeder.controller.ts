import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seed')
export class SeederController {
  constructor(private readonly seedService: SeederService) {}

  @Post()
  create() {
    return this.seedService.seed();
  }
}
