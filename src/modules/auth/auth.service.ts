import { BadRequestException, Injectable } from '@nestjs/common';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { DoLoginDto } from './dtos';
import { User, UserRepository } from '../../repositories/user.repository';

export interface Payload extends JwtPayload {
  id: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly repository: UserRepository) {}

  doLogin({ email, password }: DoLoginDto) {
    const user = this.repository.findByEmailAndPassword(email, password);
    if (!user) {
      throw new BadRequestException('E-mail or password invalid');
    }
    const accessToken = this.makeToken(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    };
  }

  makeToken(user: User): string {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1800s',
      },
    );
  }

  validateToken(token: string): Payload {
    console.log(token);
    return verify(token, process.env.JWT_KEY) as Payload;
  }
}
