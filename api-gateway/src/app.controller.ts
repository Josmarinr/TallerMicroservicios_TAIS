import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const USERS     = process.env.USERS_URL     || 'http://localhost:3001';
const PRODUCTS  = process.env.PRODUCTS_URL  || 'http://localhost:3002';
const ORDERS    = process.env.ORDERS_URL    || 'http://localhost:3003';

@Controller()
export class AppController {
  constructor(private readonly http: HttpService) {}

  @Post('users')
  async createUser(@Body() body: any) {
    const res = await firstValueFrom(this.http.post(`${USERS}/users`, body));
    return res.data;
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    const res = await firstValueFrom(this.http.get(`${USERS}/users/${id}`));
    return res.data;
  }

  @Get('products')
  async getProducts() {
    const res = await firstValueFrom(this.http.get(`${PRODUCTS}/products`));
    return res.data;
  }

  @Post('orders')
  async createOrder(@Body() body: any) {
    const res = await firstValueFrom(this.http.post(`${ORDERS}/orders`, body));
    return res.data;
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    const res = await firstValueFrom(this.http.get(`${ORDERS}/orders/${id}`));
    return res.data;
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') id: string) {
    const res = await firstValueFrom(this.http.delete(`${ORDERS}/orders/${id}`));
    return res.data;
  }
}
