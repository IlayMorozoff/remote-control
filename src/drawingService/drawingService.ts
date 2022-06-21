import robot from 'robotjs';

export class DrawingService {

  public getDrawCircleMsg(radius: number): string {

    const twoPI = Math.PI * 2.03;
    const mousePos = robot.getMousePos();

    for (let i = 0; i <= twoPI; i += 0.1) {
        const x = mousePos.x + (radius * Math.sin(i));
        const y = mousePos.y + (radius * Math.cos(i));

        robot.dragMouse(x, y);
        robot.mouseToggle('down');
    }
    robot.mouseToggle('up');

    return `draw_circle ${radius}\0`;
  }

  public getDrawRectangleMsg(width: number, height: number): string {
    const { x, y } = robot.getMousePos();

    const originCoords = { x, y };

    const points = [
      {x: originCoords.x, y: originCoords.y},
      {x: originCoords.x + width, y: originCoords.y },
      {x: originCoords.x + width, y: originCoords.y - height },
      {x: originCoords.x, y: originCoords.y - height },
      {x: originCoords.x, y: originCoords.y},
    ]
    robot.setMouseDelay(100)
    points.forEach((point) => {
      robot.mouseToggle('down');
      robot.moveMouseSmooth(point.x, point.y)
      robot.dragMouse(point.x, point.y);
    });
    robot.mouseToggle('up');

    return `draw_rectangle ${width} ${height}\0`;
  }

  public getDrawSquareMsg(size: number): string {
    const { x, y } = robot.getMousePos();

    const originCoords = { x, y };

    const points = [
      {x: originCoords.x, y: originCoords.y},
      {x: originCoords.x + size, y: originCoords.y },
      {x: originCoords.x + size, y: originCoords.y - size },
      {x: originCoords.x, y: originCoords.y - size },
      {x: originCoords.x, y: originCoords.y},
    ]
    robot.setMouseDelay(100);
    points.forEach((point) => {
      robot.mouseToggle('down');
      robot.moveMouseSmooth(point.x, point.y)
      robot.dragMouse(point.x, point.y);
    });
    robot.mouseToggle('up');

    return `draw_square ${size}\0`;
  }
}