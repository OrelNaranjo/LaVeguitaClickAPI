import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create({
      ...createInvoiceDto,
      details: undefined,
    });
    const savedInvoice = await this.invoiceRepository.save(invoice);
    const details = createInvoiceDto.details.map((detail) => ({
      ...detail,
      invoice: savedInvoice,
    }));
    await this.invoiceDetailRepository.save(details);
    return this.invoiceRepository.findOne({ where: { id: savedInvoice.id }, relations: ['details', 'details.product', 'customer'] });
  }

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find({ relations: ['details', 'details.product', 'customer'] });
  }

  findOne(id: number): Promise<Invoice> {
    return this.invoiceRepository.findOne({ where: { id }, relations: ['details', 'details.product', 'customer'] });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    await this.invoiceRepository.update(id, {
      ...updateInvoiceDto,
      details: undefined,
    });
    await this.invoiceDetailRepository.delete({ invoice: { id } });
    const newDetails = updateInvoiceDto.details.map((detail) => ({
      ...detail,
      invoice: { id },
    }));
    await this.invoiceDetailRepository.save(newDetails);
    return this.invoiceRepository.findOne({ where: { id }, relations: ['details', 'details.product', 'customer'] });
  }

  async remove(id: number): Promise<void> {
    await this.invoiceRepository.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.softDelete(Invoice, id);
      await transactionalEntityManager.softDelete(InvoiceDetail, { invoice: { id } });
    });
  }
}
