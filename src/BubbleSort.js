import Column from './Column';

export const bubbleSort = (
  data,
  canvasContext,
  columnArray,
  delay = 0,
  dimension,
  callback
) => {
  nestedLoop(data, canvasContext, columnArray, delay, dimension, callback);
};

const timer = ms => {
  return new Promise(res => setTimeout(res, ms));
};

const task = async (j, data, canvasContext, columnArray, delay, dimension) => {
  let temp;
  let { canvasHeight } = dimension;
  if (data[j] < data[j + 1]) {
    temp = data[j];
    data[j] = data[j + 1];
    data[j + 1] = temp;
    let rectHeight1 = data[j] * (canvasHeight / 2);
    let rectHeight2 = data[j + 1] * (canvasHeight / 2);
    columnArray[j] = new Column(
      columnArray[j].x,
      columnArray[j].y,
      columnArray[j].width,
      Math.floor(-canvasHeight / 2 + rectHeight1)
    );
    columnArray[j + 1] = new Column(
      columnArray[j + 1].x,
      columnArray[j + 1].y,
      columnArray[j + 1].width,
      Math.floor(-canvasHeight / 2 + rectHeight2)
    );
    canvasContext.clearRect(
      columnArray[j].x,
      dimension.canvasHeight / 2,
      Math.ceil(columnArray[j].width + columnArray[j + 1].width) + 8,
      canvasHeight / 2
    );
    canvasContext.fillRect(
      columnArray[j].x,
      columnArray[j].y,
      columnArray[j].width,
      Math.floor(-canvasHeight / 2 + rectHeight1)
    );
    canvasContext.fillStyle = '#00FF91';
    canvasContext.fillRect(
      columnArray[j + 1].x,
      columnArray[j + 1].y,
      columnArray[j + 1].width,
      Math.floor(-canvasHeight / 2 + rectHeight2)
    );
  }
  canvasContext.fillStyle = '#6002EE';
  await timer(delay);
};

const nestedLoop = async (
  data,
  canvasContext,
  columnArray,
  delay,
  dimension,
  callback
) => {
  const length = data.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      await task(j, data, canvasContext, columnArray, delay, dimension);
    }
  }
  callback();
};
