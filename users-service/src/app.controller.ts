import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  create(@Body() body: { name: string; email: string }) {
    return this.service.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
}
