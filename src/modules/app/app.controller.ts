import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Payload } from '../auth/auth.service';

@Controller()
@ApiTags('MyApp')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Request() { userId }: Payload): string {
    return this.appService.getHello(userId);
  }
}
