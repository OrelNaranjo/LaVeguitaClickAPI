import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }

  @Post('increment')
  async incrementStock(@Body() body: { product_id: number; warehouse_id: number; quantity: number }) {
    return this.stockService.incrementStock(body.product_id, body.warehouse_id, body.quantity);
  }

  @Post('decrement')
  async decrementStock(@Body() body: { product_id: number; warehouse_id: number; quantity: number }) {
    return this.stockService.decrementStock(body.product_id, body.warehouse_id, body.quantity);
  }
}
