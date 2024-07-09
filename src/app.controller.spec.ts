import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return a slow response with worker PID', () => {
      const slowResponse = `slow response worker: ${process.pid}`;
      expect(appController.getSlow()).toBe(slowResponse);
    });

    it('should return a fast response with worker PID', () => {
      const fastResponse = `faster response  worker:${process.pid}`;
      expect(appController.getFast()).toBe(fastResponse);
    });
  });
});
