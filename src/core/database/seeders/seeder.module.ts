import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../../../shared/modules/city/entities/city.entity';
import { Commune } from '../../../shared/modules/commune/entities/commune.entity';
import { Country } from '../../../shared/modules/country/entities/country.entity';
import { Region } from '../../../shared/modules/region/entities/region.entity';
import { Account } from '../../modules/auth/account/entity/account.entity';
import { Privilege } from '../../modules/auth/privilege/entities/privilege.entity';
import { Role } from '../../modules/auth/role/entities/role.entity';
import { User } from '../../modules/auth/user/entities/user.entity';
import { Category } from '../../modules/production/category/entities/category.entity';
import { Product } from '../../modules/production/product/entities/product.entity';
import { Stock } from '../../modules/production/stock/entities/stock.entity';
import { Warehouse } from '../../modules/production/warehouse/entities/warehouse.entity';
import { Supplier } from '../../modules/purchases/supplier/entities/supplier.entity';
import { Employee } from '../../modules/staff/employee/entities/employee.entity';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Country,
      Region,
      City,
      Commune,
      Account,
      Role,
      Privilege,
      User,
      Supplier,
      Employee,
      Category,
      Product,
      Warehouse,
      Stock,
    ]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
