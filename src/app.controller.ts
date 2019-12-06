import { Controller, Get, Post, Req, Res, Query, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { TestGateway } from './ws/ws.gateway';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';

import { UsersService, AgoraService } from './services';
import { ResultUtil } from './utils/result.util';
import { DoctorLoginDto } from './dtos/dtos';
import { ApiUseTags, ApiConsumes, ApiImplicitFile, ApiOperation, ApiBearerAuth, ApiModelProperty } from '@nestjs/swagger';
import { join } from 'path';
import * as formidable from 'formidable';
import * as fs from 'fs';
import * as contentDisposition from 'content-disposition';
@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly agoraService: AgoraService,

    // private readonly testGateway: TestGateway
  ) { }

  @Get('/notify')
  async notify() {
    return ResultUtil.success('请求成功', await this.usersService.notify());
  }
  // @Get('/destory')
  // async destory(@Query('tid') tid: number) {
  //   return ResultUtil.success('请求成功', await this.usersService.destoryTimer(Number(tid)));
  // }
  @Get('/patients')
  async listPatients() {
    return ResultUtil.success('请求成功', await this.usersService.findAllPatients());
  }
  @Get('/doctors')
  async listDoctors() {
    return ResultUtil.success('请求成功', await this.usersService.findAllDoctors());
  }

  @ApiOperation({ title: '获取患者的token' })
  @Get('/patienTempToken')
  async patienTempToken(@Query('patientId') patientId: number, @Query('channel') channel: string) {
    return ResultUtil.success('请求成功', await this.agoraService.genToken(channel, patientId));
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

  @ApiOperation({ title: '文件流' })
  @Get('/fileStream')
  async fileStream(@Res() res: any) {
    let buff = fs.readFileSync(__dirname + '/test.pdf');
    res.set('Content-Disposition', contentDisposition("test.pdf"))
    res.end(buff)
    // return;
  }

  // @ApiOperation({ title: '单个文件上传' })
  // @ApiConsumes('multipart/form-data')
  // @ApiImplicitFile({ name: 'file', required: true, description: '文件' })
  // @Post('file')
  // @UseInterceptors(FileInterceptor('file'))
  // async upload(@UploadedFile() file, @Req() req) {
  //   var form = new formidable.IncomingForm();
  //   form.parse(req, (err, fields, files) => {
  //     console.log({
  //       err, fields, files
  //     })
  //   })
  //   // console.log({ file, req })
  //   const fileNewName = `${Date.now()}-${file.originalname}`;
  //   const writeImage = createWriteStream(join(__dirname, fileNewName));
  //   if (!writeImage.write(file.buffer)) {
  //     console.log(fileNewName)
  //     return fileNewName;
  //   } else {
  //     return `fail`;
  //   }
  // }
  // // /* 广播消息 */
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
