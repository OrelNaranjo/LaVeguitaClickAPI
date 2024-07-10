import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailsService } from '../../../../shared/services/mails/mails.service';
import { Product } from '../../production/product/entities/product.entity';
import { Employee } from '../../staff/employee/entities/employee.entity';
import { Supplier } from '../supplier/entities/supplier.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';
import { Transactional } from 'typeorm-transactional';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private mailsService: MailsService,
  ) {}

  @Transactional()
  async create(createOrderDto: CreateOrderDto, shouldSendEmail: boolean) {
    const { employee, supplier, orderDetails } = createOrderDto;

    const [employeeEntity, supplierEntity] = await Promise.all([
      this.employeeRepository.findOne({ where: { id: employee.id }, relations: ['account', 'account.user'] }),
      this.supplierRepository.findOneBy({ id: supplier.id }),
    ]);

    if (!employeeEntity) {
      throw new NotFoundException(`Employee with ID ${employee.id} not found`);
    }

    if (!supplierEntity) {
      throw new NotFoundException(`Supplier with ID ${supplier.id} not found`);
    }

    const newOrderNumber = await this.ordersRepository.query("SELECT nextval('order_number_seq') as nextval");
    const orderNumber = newOrderNumber[0].nextval;

    const newOrder = this.ordersRepository.create({ ...createOrderDto, orderNumber, employee, supplier });

    const savedOrder = await this.ordersRepository.save(newOrder);

    let totalOrder = 0;

    const savedOrderDetails = await Promise.all(
      orderDetails.map(async (detail) => {
        const product = await this.productRepository.findOneBy({ id: detail.product.id });
        if (!product) {
          throw new NotFoundException(`Product with ID ${detail.product.id} not found`);
        }
        const subtotal = detail.quantity * product.cost;
        totalOrder += subtotal;
        const orderDetail = this.orderDetailsRepository.create({
          quantity: detail.quantity,
          price: product.price,
          cost: product.cost,
          subtotal: subtotal,
          order: savedOrder,
          product: product,
        });
        return this.orderDetailsRepository.save(orderDetail);
      }),
    );

    savedOrder.orderDetails = savedOrderDetails;
    savedOrder.total = totalOrder;
    await this.ordersRepository.save(savedOrder);

    const result = {
      id: savedOrder.id,
      orderNumber: savedOrder.orderNumber,
      notes: savedOrder.notes,
      employee: employeeEntity,
      supplier: supplierEntity,
      orderDetails: savedOrderDetails.map((detail) => ({
        id: detail.id,
        quantity: detail.quantity,
        price: detail.price,
        cost: detail.cost,
        subtotal: detail.subtotal,
        product: detail.product,
      })),
      date: savedOrder.date,
      total: savedOrder.total,
    };

    if (shouldSendEmail) {
      setImmediate(() => {
        this.sendOrderEmail(result as Order);
      });
    }

    return result;
  }

  async sendOrderEmail(order: Order) {
    const emailDetails = {
      email: order.supplier.email,
      supplierName: order.supplier.company_name,
      orderNumber: order.orderNumber,
      date: format(order.date, 'PPPP', { locale: es }),
      employeeName: order.employee.account.first_name + ' ' + order.employee.account.last_name,
      notes: order.notes,
      orderDetails: order.orderDetails.map((detail) => ({
        productName: detail.product.name,
        quantity: detail.quantity,
        cost: detail.cost,
      })),
      total: order.total,
    };
    await this.mailsService.send('order', 'Orden de Compra', emailDetails);
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['supplier'] });
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({ where: { id }, relations: ['employee', 'supplier', 'orderDetails', 'orderDetails.product'] });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.preload({ id, ...updateOrderDto });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.ordersRepository.save(order);
  }

  async remove(id: number) {
    return this.ordersRepository.softDelete(id);
  }
}
