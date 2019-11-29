import { Controller, Get, Post, Req, Query, Body } from '@nestjs/common';
// import { TestGateway } from './ws/ws.gateway';
import { UsersService } from './services';
import { ResultUtil } from './utils/result.util';
import { DoctorLoginDto } from './dtos/dtos';
import { ApiUseTags, ApiOperation, ApiBearerAuth, ApiModelProperty } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    // private readonly testGateway: TestGateway
  ) { }


  @Get('/patients')
  async listPatients() {
    return ResultUtil.success('请求成功', await this.usersService.findAllPatients());
  }
  @Get('/doctors')
  async listDoctors() {
    return ResultUtil.success('请求成功', await this.usersService.findAllDoctors());
  }

  @ApiOperation({ title: '医生登入自己所在的频道号和token，用于声网的登录' })
  @Post('/doctorLoginChannel')
  async doctorChannel(@Body() params: DoctorLoginDto) {
    return ResultUtil.success('请求成功', await this.usersService.doctorChannel(params.doctorId, params.type));
  }

  @ApiOperation({ title: '医生退出频道' })
  @Get('/doctorQuitChannel')
  async quitChannel(@Query('doctorId') doctorId: number) {
    return ResultUtil.success('请求成功', await this.usersService.doctorQuitChannel(doctorId));
  }
  // @ApiOperation({ title: '医生呼叫患者,医生已经在频道中时可调用' })
  // @Get('/callPatient')
  // async callPatient(@Query('patientId') patientId: number, @Query('doctorId') doctorId: number) {
  //   return ResultUtil.success('请求成功', await this.usersService.callPatient(patientId, doctorId));
  // }

  @ApiOperation({ title: '用户接受呼叫' })
  @Get('/patientsAgree')
  async patientsToken(@Query('patientId') patientId: number, @Query('channel') channel: string) {
    return ResultUtil.success('请求成功', await this.usersService.patientAgree(channel, patientId));
  }


  // /* 广播消息 */
  // @Get('/websocket/chat')
  // sendMsg() {
  //   // this.testGateway.handleChat();
  // }
  // /* 通知候诊 */
  // @Get('/websocket/notify')
  // notify(@Query('targetId') targetId: string) {// target为患者
  //   this.testGateway.handleNotify({ toUser: targetId, doctorCalling: 1 });
  // }

  // /* 患者同意开始会诊 */
  // @Get('/websocket/agree')
  // agree(@Query('targetId') targetId: string, @Req() req) { // target为医生
  //   this.testGateway.startChat(targetId, req);
  // }
}
