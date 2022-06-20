import Jimp from 'jimp';
import { httpServer } from './http_server/index';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import { WebSocketController } from './websocket/websocket';

const HTTP_PORT = 3000;

// const wss = new WebSocketController(8080);

// wss.join()

const wss = new WebSocketServer({
  port: 8080
});

wss.on('connection', (ws) => {
    console.log('подключение совершилось')

    ws.on('message', (message) => {

      const { x, y } = robot.getMousePos();

      console.log('dadada',  x, y)
      // теперь отправляем
      ws.send(`mouse_position ${x},${y}`)
    });


    ws.on('close', () => {
      console.log('клиент закончил работу')
      
    })
    

})

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});