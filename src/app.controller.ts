import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { faker } from '@faker-js/faker';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return typeof faker.music.genre();
    return this.appService.getHello();
  }
}
