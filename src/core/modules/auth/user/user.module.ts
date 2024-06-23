import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Account } from '../account/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Account]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
