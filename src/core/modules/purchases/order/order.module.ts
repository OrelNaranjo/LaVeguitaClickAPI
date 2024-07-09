import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../production/product/entities/product.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';
import { MailsService } from '../../../../shared/services/mails/mails.service';
import { Employee } from '../../staff/employee/entities/employee.entity';
import { Supplier } from '../supplier/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, Employee, Supplier])],
  controllers: [OrderController],
  providers: [OrderService, MailsService],
})
export class OrderModule {}
