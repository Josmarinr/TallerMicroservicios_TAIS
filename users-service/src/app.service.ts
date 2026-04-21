import { Injectable, NotFoundException } from '@nestjs/common';

let nextId = 1;
const users: any[] = [];

@Injectable()
export class AppService {
  create(body: { name: string; email: string }) {
    const user = { id: nextId++, name: body.name, email: body.email };
    users.push(user);
    return user;
  }

  findOne(id: number) {
    const user = users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
