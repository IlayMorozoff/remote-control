import { WebSocketService } from '../webSocketService/webSocketService';
import { WebSocketServer } from 'ws';

export class WebSocketController extends WebSocketServer {
    private webSockerService: WebSocketService;

    constructor(port: number) {
        super({ port });
        this.webSockerService = new WebSocketService();

        this.on('connection', (ws) => {
            console.log('Connection!!!');

            ws.on('message', async (data) => {
                console.log('received: ', data.toString());
                const response = await this.webSockerService.requestHandler(data.toString());
                ws.send(response);
                
            });
        });
    }
}