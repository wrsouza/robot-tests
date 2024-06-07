import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const prefix = 'Bearer ';
    const accessToken = request.headers['authorization'];
    if (!accessToken || !accessToken.includes(prefix)) {
      return false;
    }

    const decodedToken = this.authService.validateToken(
      accessToken.split(' ')[1],
    );
    request.userId = decodedToken.id;
    return true;
  }
}
