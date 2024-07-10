import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeDetail } from './entities/employee-detail.entity';
import { Employee } from './entities/employee.entity';
import { Account } from '../../auth/account/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, EmployeeDetail, Account])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
