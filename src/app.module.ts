import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/modules/auth/auth.module';
import { DatabaseService } from './core/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederModule } from './core/database/seeders/seeder.module';
import { SharedModule } from './shared/modules/shared.module';
import { CategoryModule } from './core/modules/production/category/category.module';
import { WarehouseModule } from './core/modules/production/warehouse/warehouse.module';
import { ProductModule } from './core/modules/production/product/product.module';
import { StockModule } from './core/modules/production/stock/stock.module';
import { EmployeeModule } from './core/modules/staff/employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    AuthModule,
    SeederModule,
    SharedModule,
    CategoryModule,
    WarehouseModule,
    ProductModule,
    StockModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
