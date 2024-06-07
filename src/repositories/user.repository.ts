import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserRepository {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'User Test',
      email: 'user@test.com',
      password: '123456',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@domain.com',
      password: 'password',
    },
  ];

  findById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  findByEmailAndPassword(email: string, password: string): User {
    return this.users.find(
      (user) => user.email === email && user.password === password,
    );
  }
}
