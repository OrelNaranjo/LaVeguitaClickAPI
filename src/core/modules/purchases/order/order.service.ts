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
  async create(createOrderDto: CreateOrderDto) {
    const { employeeId, supplierId, orderDetails } = createOrderDto;

    const [employee, supplier] = await Promise.all([
      this.employeeRepository.findOneBy({ id: employeeId }),
      this.supplierRepository.findOneBy({ id: supplierId }),
    ]);

    const lastOrder = (await this.ordersRepository.find({ order: { orderNumber: 'DESC' }, take: 1 }))[0] || { orderNumber: 0 };

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
    }

    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    const newOrder = this.ordersRepository.create({ ...createOrderDto, orderNumber: newOrderNumber, employee, supplier });
    const savedOrder = await this.ordersRepository.save(newOrder);

    const savedOrderDetails = await Promise.all(
      orderDetails.map(async (detail) => {
        const product = await this.productRepository.findOneBy({ id: detail.productId });
        if (!product) {
          throw new NotFoundException(`Product with ID ${detail.productId} not found`);
        }
        const orderDetail = this.orderDetailsRepository.create({ ...detail, order: savedOrder, product });
        return this.orderDetailsRepository.save(orderDetail);
      }),
    );

    savedOrder.orderDetails = savedOrderDetails;

    setImmediate(() => {
      this.sendOrderEmail(savedOrder);
    });

    return savedOrder;
  }

  async sendOrderEmail(order: Order) {
    const emailDetails = {
      email: order.supplier.email,
      supplierName: order.supplier.company_name,
      orderNumber: order.orderNumber,
      date: order.date,
      employeeName: order.employee.first_name + order.employee.last_name,
      notes: order.notes,
      orderDetails: order.orderDetails.map((detail) => ({
        productName: detail.product.name,
        quantity: detail.quantity,
        cost: detail.product.cost,
      })),
      total: order.orderDetails.reduce((acc, detail) => acc + detail.quantity * detail.product.cost, 0),
    };
    await this.mailsService.send('order', 'Orden de Compra', emailDetails);
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['orderDetails'] });
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
    const order = await this.ordersRepository.findOneBy({ id: id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.ordersRepository.remove(order);
  }
}
