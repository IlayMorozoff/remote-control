import Jimp from 'jimp';
import robot from 'robotjs';
import fs from 'fs';

export class PrintScreenService {

  async getPrintScreenMsg(size: number) {
    const { x, y } = robot.getMousePos();

    const img = robot.screen.capture(x - size / 2, y - size / 2, size, size);
    const path = 'myfile.png';

    const jimp = new Jimp(size, size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const hex = img.colorAt(i, j);
        const num = parseInt(hex + "ff", 16)
        jimp.setPixelColor(num, i, j);
      }
    }
    jimp.write(path)

    const data = await jimp.getBase64Async(jimp.getMIME());

    await fs.promises.rm(path);

    return `prnt_scrn ${data.replace('data:image/png;base64,', '')}`;
  }
}