import { WebSocketService } from '../webSocketService/webSocketService';
import { createWebSocketStream, WebSocketServer } from 'ws';


export class WebSocketController extends WebSocketServer {
    private webSockerService: WebSocketService;

    constructor(port: number) {
        super({ port });
        this.webSockerService = new WebSocketService();
        console.log(`Start WebSocket server on the ${port} port!`);

        this.on('connection', (ws) => {
            console.log('Client connection')
            const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

            duplex.on('data', async (data) => {
                console.log(data)
                const response = await this.webSockerService.requestHandler(data);
                duplex.write(response);
            });

            ws.on('close', () => {
                console.log('socket closed')
                this.close();
            });
        });
    }
}