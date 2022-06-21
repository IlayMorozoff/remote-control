import { DrawingService } from '../drawingService/drawingService';
import { MouseService } from '../mouseService/mouseService';
import { PrintScreenService } from '../printScreenService/printScreenService';

const enum Commands {
  MOUSE_POSITION = 'mouse_position',
  DRAW_CIRCLE = 'draw_circle',
  DRAW_SQUARE = 'draw_square',
  DRAW_RECTANGLE = 'draw_rectangle',
  PRNT_SCRN = 'prnt_scrn',
  MOUSE_UP = 'mouse_up',
  MOUSE_LEFT = 'mouse_left',
  MOUSE_DOWN = 'mouse_down',
  MOUSE_RIGHT = 'mouse_right',
}

export class WebSocketService {
  private mouseService: MouseService;
  private drawingService: DrawingService;
  private printScreenService: PrintScreenService;

  constructor() {
    this.mouseService = new MouseService();
    this.drawingService = new DrawingService();
    this.printScreenService = new PrintScreenService();
  }

  public async requestHandler(data: string): Promise<string> {
    const [command, sizeOne, sizeTwo] = data.split(' ')

    let message = '';

    switch (command) {
      case Commands.MOUSE_UP:
        if (sizeOne) {
          message = this.mouseService.getMouseUpMsg(Number(sizeOne));
        }
        break;
      case Commands.MOUSE_LEFT:
        if (sizeOne) {
          message = this.mouseService.getMouseLeftMsg(Number(sizeOne));
        }
        break;
      case Commands.MOUSE_DOWN:
        if (sizeOne) {
          message = this.mouseService.getMouseDownMsg(Number(sizeOne));
        }
        break;
      case Commands.MOUSE_RIGHT:
        if (sizeOne) {
          message = this.mouseService.getMouseRightMsg(Number(sizeOne));
        }
        break;
      case Commands.MOUSE_POSITION:
        message = this.mouseService.getMousePositionMsg();
        break;
      case Commands.DRAW_CIRCLE:
        message = this.drawingService.getDrawCircleMsg(Number(sizeOne));
        break;
      case Commands.DRAW_SQUARE:
        message = this.drawingService.getDrawSquareMsg(Number(sizeOne));
        break;
      case Commands.DRAW_RECTANGLE:
        if (sizeOne && sizeTwo) {
          message = this.drawingService.getDrawRectangleMsg(Number(sizeOne), Number(sizeTwo));
        }
        break;
      case Commands.PRNT_SCRN:
        message = await this.printScreenService.getPrintScreenMsg(200)
        break;
    }
    return message;
  }
}