import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('slow')
  getSlow():string{
    return this.appService.getSlow();
  }
  @Get('fast')
  getFast():string{
    return this.appService.getFast();
  }
}
