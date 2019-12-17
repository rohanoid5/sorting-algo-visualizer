import BaseSort from './BaseSort';
import Column from '../Column';

class InsertionSort extends BaseSort {
  clearReact = (i: number) => {
    const factor = this.isCompareModeOn ? 2 : 1;
    const { canvasHeight } = this.dimension;
    if (!this.isTopDown) {
      this.canvasContext.clearRect(
        this.columnArray[i].x,
        factor === 2 ? canvasHeight / 2 : 0,
        Math.ceil(this.columnArray[i].width),
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
    for (let i = 1; i < length; i++) {
      let curr = data[i];
      let currRectHeight = this.getRectHeight(data[i]);
      let j = i;
      while (j > 0 && data[j - 1] < curr) {
        let prevRectHeight = this.getRectHeight(data[j - 1]);
        this.columnArray[j] = new Column(
          this.columnArray[j].x,
          this.columnArray[j].y,
          this.columnArray[j].width,
          prevRectHeight
        );
        this.clearReact(j);
        this.canvasContext.fillStyle = '#00FF91';
        this.drawRect(j, prevRectHeight);
        data[j] = data[j - 1];
        j--;
        await this.task(this.delay);
      }
      this.columnArray[j] = new Column(
        this.columnArray[j].x,
        this.columnArray[j].y,
        this.columnArray[j].width,
        currRectHeight
      );
      this.clearReact(j);
      this.canvasContext.fillStyle = '#00FF91';
      this.drawRect(j, currRectHeight);
      data[j] = curr;
    }
  };
}

export default InsertionSort;
