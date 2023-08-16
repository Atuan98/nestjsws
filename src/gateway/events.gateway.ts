import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, 
    WsResponse, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect,
    ConnectedSocket} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
const pkg = require('../../package.json');
import { AuthService } from "src/user/auth.service";

@WebSocketGateway({
    cors:{
        origin: '*',
    },
})

export class EventsGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server:Server;

    private  readonly timestamp = Date.now();
    constructor(private readonly authService: AuthService){}
    afterInit(server: any) {
        console.log("--------------------------------Init------------------------------")
    }

    @SubscribeMessage('events')
    onHeartbeat(client: any, data: any): WsResponse<string> {
        console.log(data);
        const event = 'events';
        const response = `events-${pkg.version}-${this.timestamp}`;
        return { event, data: response };
    }

    @SubscribeMessage('events2')
    onEvents2(@MessageBody() data, @ConnectedSocket() socket: Socket) {
        return this.server.to(socket.data.email).emit('message', data + '---hahahahahah')
        
    }
    
    async handleConnection(socket: Socket) {
        console.log('connect', socket.id);
        const authHeader = socket.handshake.headers.authorization;
        if (authHeader) {
          try {
            socket.data.email = await this.authService.handleVerifyToken(
              (authHeader),
            );
            socket.join(socket.data.email);
            console.log('connect success', socket.data.email);
          } catch (e) {
            socket.disconnect();
          }
        } else {
          socket.disconnect();
        }
      }
    
      async handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log('disconnect', socket.id, socket.data?.email);
      }
}