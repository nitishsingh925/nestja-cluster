import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(`Worker ${process.pid} started`);
    return 'Hello World!';
  }
  getSlow(): string {
    for (let i = 0; i < 9999999999; i++) {}
    console.log(`this is get slow method Worker ${process.pid} started`);

    return `slow response worker: ${process.pid}`;
  }
  getFast(): string {
    console.log(`this is get fast method Worker ${process.pid} started`);
    return `faster response  worker:${process.pid}`;
  }
}
