import { Injectable } from '@nestjs/common';
import { TestGateway } from './ws/ws.gateway';

@Injectable()
export class AppService {
  constructor(private readonly testGateway: TestGateway) { }
  getHello(): string {
    return 'Hello World!';
  }
  async sendTestData(event: string, data?: any) {
    this.testGateway.server.emit(event, data);
  }

}
