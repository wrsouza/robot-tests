import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DoLoginDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  doLogin(@Body() doLoginRequest: DoLoginDto) {
    return this.authService.doLogin(doLoginRequest);
  }
}
