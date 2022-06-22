import robot from 'robotjs';

export class MouseService {

  public getMousePositionMsg(): string {
    const { x, y } = robot.getMousePos();
    return `mouse_position ${x},${y}\0`;
  }

  public getMouseUpMsg(offset: number): string {
    const { x, y } = robot.getMousePos();
    robot.moveMouse(x, y - offset);
    return `mouse_up ${y - offset}\0`;
  }

  public getMouseLeftMsg(offset: number): string {
    const { x, y } = robot.getMousePos();
    robot.moveMouse(x - offset, y);
    return `mouse_left ${x - offset}\0`;
  }

  public getMouseDownMsg(offset: number): string {
    const { x, y } = robot.getMousePos();
    robot.moveMouse(x, y + offset);
    return `mouse_down ${y + offset}\0`;
  }

  public getMouseRightMsg(offset: number): string {
    const { x, y } = robot.getMousePos();
    robot.moveMouse(x + offset, y);
    return `mouse_right ${x + offset}\0`;
  }
}