import Column from '../Column';
type dimensionType = {
  xPos: number;
  yPos: number;
  canvasWidth: number;
  canvasHeight: number;
};

export default class BaseSort {
  data: number[];
  canvasContext: any;
  columnArray: Column[];
  dimension: dimensionType;
  isTopDown: boolean;
  isCompareModeOn: boolean;
  delay: number;
  callback: () => void;
  constructor(
    data: number[],
    canvasContext: any,
    columnArray: Column[],
    dimension: dimensionType,
    isTopDown: boolean,
    isCompareModeOn: boolean,
    callback: () => void,
    delay = 0
  ) {
    this.data = data;
    this.canvasContext = canvasContext;
    this.columnArray = columnArray;
    this.dimension = dimension;
    this.isTopDown = isTopDown;
    this.isCompareModeOn = isCompareModeOn;
    this.callback = callback;
    this.delay = delay;
  }

  timer = (ms: number) => {
    return new Promise(res => setTimeout(res, ms));
  };

  task = async (delay: number) => {
    await this.timer(delay);
  };

  getRectHeight = (value: number) => {
    const factor = this.isCompareModeOn ? 2 : 1;
    const { canvasHeight } = this.dimension;
    if (this.isTopDown) {
      return canvasHeight / factor - value * (canvasHeight / factor);
    } else {
      return value * (canvasHeight / factor) - canvasHeight / factor;
    }
  };

  drawRect = (i: number, reactHeight: number) => {
    if (!this.isTopDown) {
      this.canvasContext.fillRect(
        this.columnArray[i].x,
        this.columnArray[i].y,
        this.columnArray[i].width,
        Math.floor(reactHeight)
      );
    } else {
      this.canvasContext.fillRect(
        this.columnArray[i].x,
        0,
        this.columnArray[i].width,
        Math.floor(reactHeight)
      );
    }
  };
}
