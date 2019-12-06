import { Injectable } from '@nestjs/common';
import { AgodaConfig } from '../config/agora';
import { StrUtil } from '../utils/strUtil';
import { AccessToken } from 'agora-access-token';
const { Token, Priviledges } = AccessToken;

@Injectable()
export class AgoraService {

    genChannelNo() {
        return StrUtil.genRandomStr('ag_channel');
    }


    genToken(channel: string, uid: number, type?: number) {

        const key = new Token(AgodaConfig.appID, AgodaConfig.appCertificate, channel, uid);
        key.addPriviledge(Priviledges.kJoinChannel, type === 1 ? AgodaConfig.patientExpireTimestamp : AgodaConfig.doctorExpireTimestamp);
        const token = key.build();
        return token;
    }

}