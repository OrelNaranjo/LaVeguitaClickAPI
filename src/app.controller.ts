import { Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { GetUsername } from './core/decorators/app.decorator';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { Account } from './core/modules/auth/account/entity/account.entity';

@Controller('')
export class AppController {
  @Get()
  getRoot() {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(200)
  getStatus(@GetUsername() username: Account['username']) {
    return {
      username: username,
      status: 'OK',
      statusCode: 200,
    };
  }
}
