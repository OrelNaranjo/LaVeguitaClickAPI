import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './role.controller';
import { RoleService } from './role.service';
import { Privilege } from '../privilege/entities/privilege.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Privilege])],
  controllers: [RolesController],
  providers: [RoleService],
})
export class RoleModule {}
