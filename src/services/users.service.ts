import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AgodaConfig } from '../config/agora';
import { StrUtil } from '../utils/strUtil';
import { Patient } from '../entities/patient';
import { Doctor } from '../entities/doctor';
import { Room } from '../entities/room';
import { AgoraService } from './agora.service';

import { Redis } from 'ioredis';
import { InjectRedisClient } from 'nestjs-ioredis';

@Injectable()
export class UsersService {

    constructor(
        private readonly em: EntityManager,
        private readonly agoraService: AgoraService,
        @InjectRedisClient() private readonly redis: Redis,

    ) { }
    async findAllPatients() {
        return this.em.find(Patient);
    }
    async findAllDoctors() {
        return this.em.find(Doctor);
    }
    async doctorQuitChannel(doctorId: number) {
        const doctorRoom = await this.em.findOne(Room, { where: { doctorId, status: 1 } });
        doctorRoom.status = 2;
        await this.em.save(Room, doctorRoom);
    }

    async doctorChannel(doctorId: number, type?: number) {
        let doctorRoom = await this.em.findOne(Room, { where: { doctorId } });
        const doctor = await this.em.findOne(Doctor, { where: { doctorId } });
        if (!doctorRoom) {
            doctorRoom = new Room();
            doctorRoom.roomSn = this.agoraService.genChannelNo();
            doctorRoom.doctorId = doctorId;
            doctorRoom.createAt = new Date();
        }
        doctorRoom.status = 1;
        await this.em.save(Room, doctorRoom);
        if (!doctor) {
            return {
                errmsg: '没有该医生',
            };
        }
        const token: string = doctor.agoraToken && type !== 1 ? doctor.agoraToken : this.agoraService.genToken(doctorRoom.roomSn, doctorId);
        if (!doctor.agoraToken || type === 1) {
            doctor.agoraToken = token;
            await this.em.save(Doctor, doctor);
        }
        return { channel: doctorRoom.roomSn, token };
    }

    // 呼叫患者只能是websocket做 将channel发给用户 用户获取channel后发起请求获取token,请求接入视频channel
    // async callPatient(patientId: number, doctorId: number) {
    //     const room = await this.em.findOne(Room, { where: { doctorId, status: 1 } });
    //     if (!room) {
    //         return { errmsg: '当前医生未进入频道，无法呼叫患者' };
    //     }
    //     return { channel: room.roomSn };
    // }

    async patientAgree(channel: string, patientId: number) {
        const token = this.agoraService.genToken(channel, patientId, 1);
        this.redis.set(`patient_channel_token:${patientId}:${channel}`, token);
        return { token, channel };
    }
}