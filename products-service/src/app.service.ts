import { Injectable } from '@nestjs/common';

const products = [
  { id: 1, name: 'Laptop',    price: 1200 },
  { id: 2, name: 'Mouse',     price: 25   },
  { id: 3, name: 'Teclado',   price: 45   },
  { id: 4, name: 'Monitor',   price: 300  },
  { id: 5, name: 'Audifonos', price: 80   },
];

@Injectable()
export class AppService {
  findAll() {
    return products;
  }
}
