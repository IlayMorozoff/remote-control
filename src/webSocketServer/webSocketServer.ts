import { WebSocketService } from '../webSocketService/webSocketService';
import { createWebSocketStream, WebSocketServer } from 'ws';


export class WebSocketController extends WebSocketServer {
    private webSockerService: WebSocketService;

    constructor(port: number) {
        super({ port });
        this.webSockerService = new WebSocketService();
        console.log(`Start WebSocket server on the ${port} port!`);

        this.on('connection', (ws) => {
            console.log('Client connected');
            const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

            duplex.on('data', async (data) => {
                const response = await this.webSockerService.requestHandler(data);
                console.log(response)
                duplex.write(response);
            });

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
        this.on('close', () => {
            console.log('socket closed');
        });
    }
}