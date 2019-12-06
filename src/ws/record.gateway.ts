import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Socket } from 'socket.io';
import { EntityManager } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@WebSocketGateway(5001, { namespace: 'video' })
export class RecordGateWay implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly em: EntityManager) { }
    @WebSocketServer() server;

    socketIdUserIdMap: Map<string, string> = new Map<string, string>(); // 用户id和socketid映射
    chattingMap: Map<string, string> = new Map<string, string>(); // 正在聊天的医生和患者
    connectedUsers: string[] = [];
    async handleConnection(socket: Socket) {
        const userEnter = socket.handshake.query.userId;
        this.socketIdUserIdMap.set(String(userEnter), socket.id);
        console.log("Map:enter", this.socketIdUserIdMap)
        this.connectedUsers = [...this.connectedUsers, String(socket.id)]
    }
    async handleDisconnect(socket: Socket) {
        const userLeave = socket.handshake.query.userId;
        const targetId = this.chattingMap.get(userLeave);
        this.chattingMap.delete(userLeave);
        this.chattingMap.delete(targetId);
        this.socketIdUserIdMap.delete(String(userLeave));
        console.log("Map:leave", this.socketIdUserIdMap)
        const userIndex = this.connectedUsers.indexOf(String(socket.id))
        if (userIndex > -1) {
            this.connectedUsers = [...this.connectedUsers.slice(0, userIndex), ...this.connectedUsers.slice(userIndex + 1)];
        }
    }

    @SubscribeMessage('recording')
    async receiveBuffer(sender: Socket, data) {
        const chunks = data.chunks;
        const userId = data.userId;
        try {
            // tslint:disable-next-line: quotemark
            fs.appendFileSync(path.join(process.env.NGINX_VIDEO_DIR || __dirname, data.originalName), chunks, { encoding: "binary" });
            console.log("success")
        } catch (error) {
            console.error(error)
        }
    }

}
