import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('orders')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  create(@Body() body: { userId: number; products: number[] }) {
    return this.service.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
