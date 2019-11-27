import { Controller, Get, Post, Req, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TestGateway } from './ws/ws.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly testGateway: TestGateway) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /* 广播消息 */
  @Get('/websocket/chat')
  sendMsg() {
    this.testGateway.server.emit('subtest', { msg: 'aaaa', doctorId: 'd1' })
  }
  /* 通知候诊 */
  @Get('/websocket/notify')
  notify(@Query('targetId') targetId: string) {
    this.testGateway.handleNotify({ toUser: targetId, doctorCalling: 1 });
  }
}
