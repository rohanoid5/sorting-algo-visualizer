import BaseSort from './BaseSort';
import Column from '../Column';

class BubbleSort extends BaseSort {
  clearReact = (i: number) => {
    const factor = this.isCompareModeOn ? 2 : 1;
    const { canvasHeight } = this.dimension;
    if (!this.isTopDown) {
      this.canvasContext.clearRect(
        this.columnArray[i].x,
        factor === 2 ? canvasHeight / 2 : 0,
        Math.ceil(this.columnArray[i].width + this.columnArray[i + 1].width) +
          8,
        canvasHeight / factor
      );
    } else {
      this.canvasContext.clearRect(
        this.columnArray[i].x,
        0,
        Math.ceil(this.columnArray[i].width),
        canvasHeight / 2
      );
    }
  };

  sort = async () => {
    const data = this.data.slice(0);
    const length = data.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        let temp;
        if (data[j] < data[j + 1]) {
          temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
          let rectHeight1 = this.getRectHeight(data[j]);
          let rectHeight2 = this.getRectHeight(data[j + 1]);
          this.columnArray[j] = new Column(
            this.columnArray[j].x,
            this.columnArray[j].y,
            this.columnArray[j].width,
            Math.floor(rectHeight1)
          );
          this.columnArray[j + 1] = new Column(
            this.columnArray[j + 1].x,
            this.columnArray[j + 1].y,
            this.columnArray[j + 1].width,
            Math.floor(rectHeight2)
          );
          this.clearReact(j);
          this.drawRect(j, rectHeight1);
          this.canvasContext.fillStyle = '#00FF91';
          this.drawRect(j + 1, rectHeight2);
        }
        // canvasContext.fillStyle = '#6002EE';
        await this.task(this.delay);
      }
    }
  };
}

export default BubbleSort;
