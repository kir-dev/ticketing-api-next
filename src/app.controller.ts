import { Controller, Get, Param, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get(':name')
  getPersonalizedHello(
    @Param('name') name: string,
    @Query('day') day: string,
  ): string {
    return this.appService.getHello(name, day)
  }
}
