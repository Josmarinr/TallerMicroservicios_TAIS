import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
