import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Socket } from 'socket.io';
import { } from 'typeorm';
@WebSocketGateway(3001, { namespace: 'test' })
export class TestGateway implements OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer() server;
    socketIdUserIdMap: Map<string, string> = new Map<string, string>();
    connectedUsers: string[] = [];
    roomId: 'room1';
    async handleConnection(socket: Socket) {
        console.log("handshake:", socket.handshake.query);
        const userEnter = socket.handshake.query.userId;
        this.socketIdUserIdMap.set(String(userEnter), socket.id);
        console.log("Map:enter", this.socketIdUserIdMap)
        this.connectedUsers = [...this.connectedUsers, String(socket.id)]
        console.log("handleConnection users:", this.connectedUsers);
        socket.join(this.roomId);
       
        // this.server.emit('users', this.connectedUsers)
    }
    async handleDisconnect(socket: Socket) {
  
        const userLeave = socket.handshake.query.userId;
        this.socketIdUserIdMap.delete(String(userLeave));
        console.log("Map:leave", this.socketIdUserIdMap)
        const userIndex = this.connectedUsers.indexOf(String(socket.id))
        if (userIndex > -1) {
            this.connectedUsers = [...this.connectedUsers.slice(0, userIndex), ...this.connectedUsers.slice(userIndex + 1)];
        }
        console.log("handleDisConnection users:", this.connectedUsers);
        this.server.emit('users', this.connectedUsers)
    }
    @SubscribeMessage('chat')
    handleChat(sender: Socket, data) {
        console.log("aaaaa:",sender.rooms)
        console.log('success ws!', data);
        const targetId = String(data.toUser);
        const targetSocket = this.socketIdUserIdMap.get(targetId);
        console.log({ targetSocket })
        if (!targetSocket) {
            throw new Error('lose contact')
        }
        this.server.to(targetSocket).emit('chat', data)
    }
 
    handleNotify(data) {
        const targetId = String(data.toUser);
        const targetSocket = this.socketIdUserIdMap.get(targetId);
        console.log({ targetSocket })
        if (!targetSocket) {
            throw new Error('lose contact')
        }
        this.server.to(targetSocket).emit('called', data.doctorCalling);
    }
}