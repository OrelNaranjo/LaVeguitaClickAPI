import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/entity/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Role])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
