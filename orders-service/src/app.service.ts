import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import axios from 'axios';

const USERS = process.env.USERS_URL || 'http://localhost:3001';

let nextId = 1;
const orders: any[] = [];

@Injectable()
export class AppService {
  async create(body: { userId: number; products: number[] }) {
    if (!body.userId || !body.products || body.products.length === 0) {
      throw new BadRequestException('userId y products son requeridos');
    }

    try {
      await axios.get(`${USERS}/users/${body.userId}`);
    } catch {
      throw new NotFoundException(`Usuario con id ${body.userId} no existe`);
    }

    const order = {
      id: nextId++,
      userId: body.userId,
      products: body.products,
      createdAt: new Date().toISOString(),
    };

    orders.push(order);
    return order;
  }

  findOne(id: number) {
    const order = orders.find((o) => o.id === id);
    if (!order) throw new NotFoundException('Pedido no encontrado');
    return order;
  }

  remove(id: number) {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) throw new NotFoundException('Pedido no encontrado');
    orders.splice(index, 1);
    return { message: `Pedido ${id} eliminado` };
  }
}
