import BaseSort from './BaseSort';
import Column from '../Column';
import { resolve } from 'q';

class QuickSort extends BaseSort {
  clearReact = (i: number) => {
    const factor = this.isCompareModeOn ? 2 : 1;
    const { canvasHeight } = this.dimension;
    if (this.isTopDown) {
      this.canvasContext.clearRect(
        this.columnArray[i].x,
        0,
        Math.ceil(this.columnArray[i].width),
        canvasHeight / 2
      );
    } else {
      this.canvasContext.clearRect(
        this.columnArray[i].x,
        factor === 2 ? canvasHeight / factor : 0,
        Math.ceil(this.columnArray[i].width),
        canvasHeight / factor
      );
    }
  };

  swap = async (leftIndex: number, rightIndex: number) => {
    let temp = this.data[leftIndex];
    this.data[leftIndex] = this.data[rightIndex];
    this.data[rightIndex] = temp;
    await this.task(this.delay);
  };

  partition = async (left: number, right: number) => {
    let pivotIndex = Math.floor((right + left) / 2),
      pivot = this.data[pivotIndex], //middle element
      i = left, //left pointer
      j = right; //right pointer
    let pivotRectHeight = this.getRectHeight(this.data[pivotIndex]);
    this.columnArray[pivotIndex] = new Column(
      this.columnArray[pivotIndex].x,
      this.columnArray[pivotIndex].y,
      this.columnArray[pivotIndex].width,
      Math.floor(pivotRectHeight)
    );
    this.clearReact(pivotIndex);
    this.canvasContext.fillStyle = '#FF0040';
    this.drawRect(pivotIndex, pivotRectHeight);
    while (i <= j) {
      while (this.data[i] > pivot) {
        i++;
      }
      while (this.data[j] < pivot) {
        j--;
      }
      if (i <= j) {
        await this.swap(i, j); //sawpping two elements
        let rectHeight1 = this.getRectHeight(this.data[i]);
        let rectHeight2 = this.getRectHeight(this.data[j]);
        this.columnArray[i] = new Column(
          this.columnArray[i].x,
          this.columnArray[i].y,
          this.columnArray[i].width,
          Math.floor(rectHeight1)
        );
        this.columnArray[j] = new Column(
          this.columnArray[j].x,
          this.columnArray[j].y,
          this.columnArray[j].width,
          Math.floor(rectHeight2)
        );
        this.clearReact(i);
        this.clearReact(j);
        this.canvasContext.fillStyle = '#00FF91';
        this.drawRect(i, rectHeight1);
        this.drawRect(j, rectHeight2);
        i++;
        j--;
      }
    }
    return i;
  };

  algoRunner = async (left: number, right: number) => {
    let index;
    if (this.data.length > 1) {
      index = await this.partition(left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        await this.algoRunner(left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        await this.algoRunner(index, right);
      }
    }
    if (left === 0 && right === this.columnArray.length - 1) {
      resolve();
    }
  };

  sort = async () => {
    let low = 0;
    let high = this.data.length - 1;
    await this.algoRunner(low, high);
  };
}

export default QuickSort;
