import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-ioredis';

import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AgoraService, UsersService } from './services';
import { BoardRecordGateWay } from './ws/ws.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RedisModule.forRoot({
      host: '180.76.161.139',
      port: 6379,
      password: 'CHEER*ca7are)h',
      db: 5,
    }),
  ],
  controllers: [AppController],
  providers: [AgoraService, UsersService,
    BoardRecordGateWay,
  ],
})
export class AppModule { }
