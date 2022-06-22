import dotenv from 'dotenv';
import { httpServer } from './http_server/index';
import { WebSocketController } from './webSocketServer/webSocketServer';

dotenv.config();

const HTTP_PORT = process.env.STATIC_SERVER_PORT || 3000;

const WEBSOCKET_PORT = process.env.WEBSOKET_PORT || 8080;

const ws = new WebSocketController(+WEBSOCKET_PORT);

process.on('SIGINT', () => {
  console.log('Websocket closed');
  ws.close();
  process.exit(0);
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});