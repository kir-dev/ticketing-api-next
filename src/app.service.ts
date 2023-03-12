import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name?: string, day?: string): string {
    return `Hello, ${name || 'World'}, have a nice ${day || 'day'}!`;
  }
}
