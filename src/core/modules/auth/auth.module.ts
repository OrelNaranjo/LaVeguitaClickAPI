import { AccountService } from './account/account.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { Role } from './role/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/entity/account.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.API_SECRET,
    }),
    TypeOrmModule.forFeature([Role, Account]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccountService],
  exports: [JwtModule],
})
export class AuthModule {}
