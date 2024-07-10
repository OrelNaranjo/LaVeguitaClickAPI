import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
import { CustomerModule } from './core/modules/sales/customer/customer.module';
import { InvoiceModule } from './core/modules/sales/invoice/invoice.module';
import { OrderModule } from './core/modules/purchases/order/order.module';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { SupplierModule } from './core/modules/purchases/supplier/supplier.module';

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
    CustomerModule,
    InvoiceModule,
    OrderModule,
    SupplierModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'TRANSACTIONAL_DATA_SOURCE',
      useFactory: async (dataSource: DataSource) => {
        return addTransactionalDataSource(dataSource);
      },
      inject: [DataSource],
    },
  ],
})
export class AppModule {}
