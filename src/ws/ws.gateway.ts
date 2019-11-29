import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Socket } from 'socket.io';
import { EntityManager } from 'typeorm';
import { BoardRecord } from '../entities/board_record';

@WebSocketGateway(5000, { namespace: 'board' })
export class BoardRecordGateWay implements OnGatewayConnection, OnGatewayDisconnect {
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
    @SubscribeMessage('draw')
    async drawing(sender: Socket, data) {
        const userId = sender.handshake.query.userId;
        console.log("socket drawing:", data);
    }

}


// import { TRecord } from '../entities/t_record';
// @WebSocketGateway(3001, { namespace: 'test' })
// export class TestGateway implements OnGatewayConnection, OnGatewayDisconnect {
//     constructor(private readonly em: EntityManager) { }

//     @WebSocketServer() server;
//     socketIdUserIdMap: Map<string, string> = new Map<string, string>(); // 用户id和socketid映射
//     chattingMap: Map<string, string> = new Map<string, string>(); // 正在聊天的医生和患者
//     connectedUsers: string[] = [];
//     async handleConnection(socket: Socket) {
//         const userEnter = socket.handshake.query.userId;
//         this.socketIdUserIdMap.set(String(userEnter), socket.id);
//         console.log("Map:enter", this.socketIdUserIdMap)
//         this.connectedUsers = [...this.connectedUsers, String(socket.id)]

//         // this.server.emit('users', this.connectedUsers)
//     }
//     async handleDisconnect(socket: Socket) {
//         const userLeave = socket.handshake.query.userId;
//         const targetId = this.chattingMap.get(userLeave);
//         this.chattingMap.delete(userLeave);
//         this.chattingMap.delete(targetId);
//         this.socketIdUserIdMap.delete(String(userLeave));
//         console.log("Map:leave", this.socketIdUserIdMap)
//         const userIndex = this.connectedUsers.indexOf(String(socket.id))
//         if (userIndex > -1) {
//             this.connectedUsers = [...this.connectedUsers.slice(0, userIndex), ...this.connectedUsers.slice(userIndex + 1)];
//         }
//         this.server.emit('users', this.connectedUsers)
//     }
//     @SubscribeMessage('chat')
//     handleChat(sender: Socket, data) {
//         const userId = sender.handshake.query.userId;
//         if (!this.chattingMap.has(String(data.toUser))) {
//             this.server.to(sender.id).emit('error', { errCode: 400, msg: "不在线" });
//         }
//         const targetId = String(data.toUser);
//         const targetSocket = this.socketIdUserIdMap.get(targetId);
//         if (!targetSocket) {
//             this.server.to(sender.id).emit('error', { errCode: 405, msg: "对方不在线" });
//         }
//         this.server.to(targetSocket).emit('chat', data);
//         this.em.insert(TRecord, { detail: JSON.stringify(data), userId, targetId: Number(targetId), createAt: new Date() })
//     }

//     handleNotify(data) {
//         const targetId = String(data.toUser);
//         const targetSocket = this.socketIdUserIdMap.get(targetId);
//         if (!targetSocket) {
//             throw new Error('lose contact')
//         }
//         this.server.to(targetSocket).emit('called', data.doctorCalling);
//     }
//     /* 建立聊天 */
//     startChat(targetId, req) {
//         const userId = String(req.headers.userid);
//         if (this.chattingMap.has(targetId) && this.chattingMap.has(userId)) {
//             throw new Error('already connected');
//         }
//         if (this.chattingMap.has(targetId) && !this.chattingMap.has(userId)) {
//             throw new Error('doctor busy');
//         }
//         if (this.socketIdUserIdMap.has(targetId) && this.socketIdUserIdMap.has(userId)) {// 如果医生也在线
//             this.chattingMap.set(targetId, userId);
//             this.chattingMap.set(userId, targetId);
//         } else {
//             throw new Error('start fail');
//         }
//         this.server.to(this.socketIdUserIdMap.get(targetId)).emit('calledAgreed', userId + '同意了聊天');
//         return `success`;
//     }
// }