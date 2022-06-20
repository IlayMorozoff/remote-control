import http from 'http';
import { WebSocketServer } from 'ws';

export class WebSocketController {
  private webSocketServer: WebSocketServer;

  constructor(private port: number) {
    this.webSocketServer = new WebSocketServer({
      port: this.port,
    });
  }

  join() {
    this.webSocketServer.on('connection', (ws) => {
      console.log('подключение установлено')
      ws.send('Пользователь подключился')
    })
  }
}