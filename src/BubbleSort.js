import Column from './Column';

export const bubbleSort = (
  data,
  canvasContext,
  columnArray,
  delay = 0,
  dimension,
  isTopDown,
  callback
) => {
  nestedLoop(
    data,
    canvasContext,
    columnArray,
    delay,
    dimension,
    callback,
    isTopDown
  );
};

const timer = ms => {
  return new Promise(res => setTimeout(res, ms));
};

const task = async delay => {
  await timer(delay);
};

const getRectHeight = (value, canvasHeight, isTopDown) => {
  if (isTopDown) {
    return canvasHeight / 2 - value * (canvasHeight / 2);
  } else {
    return value * (canvasHeight / 2) - canvasHeight / 2;
  }
};

const drawRect = (i, reactHeight, canvasContext, columnArray, isTopDown) => {
  if (!isTopDown) {
    canvasContext.fillRect(
      columnArray[i].x,
      columnArray[i].y,
      columnArray[i].width,
      Math.floor(reactHeight)
    );
  } else {
    canvasContext.fillRect(
      columnArray[i].x,
      0,
      columnArray[i].width,
      Math.floor(reactHeight)
    );
  }
};

const clearReact = (i, canvasHeight, canvasContext, columnArray, isTopDown) => {
  if (!isTopDown) {
    canvasContext.clearRect(
      columnArray[i].x,
      canvasHeight / 2,
      Math.ceil(columnArray[i].width + columnArray[i + 1].width) + 8,
      canvasHeight / 2
    );
  } else {
    canvasContext.clearRect(
      columnArray[i].x,
      0,
      Math.ceil(columnArray[i].width),
      canvasHeight / 2
    );
  }
};

const nestedLoop = async (
  dataArg,
  canvasContext,
  columnArray,
  delay,
  dimension,
  callback,
  isTopDown
) => {
  const data = dataArg.splice(0);
  const length = data.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      let temp;
      let { canvasHeight } = dimension;
      if (data[j] < data[j + 1]) {
        temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
        let rectHeight1 = getRectHeight(data[j], canvasHeight, isTopDown);
        let rectHeight2 = getRectHeight(data[j + 1], canvasHeight, isTopDown);
        columnArray[j] = new Column(
          columnArray[j].x,
          columnArray[j].y,
          columnArray[j].width,
          Math.floor(rectHeight1)
        );
        columnArray[j + 1] = new Column(
          columnArray[j + 1].x,
          columnArray[j + 1].y,
          columnArray[j + 1].width,
          Math.floor(rectHeight2)
        );
        clearReact(j, canvasHeight, canvasContext, columnArray, isTopDown);
        drawRect(j, rectHeight1, canvasContext, columnArray, isTopDown);
        canvasContext.fillStyle = '#00FF91';
        drawRect(j + 1, rectHeight2, canvasContext, columnArray, isTopDown);
      }
      canvasContext.fillStyle = '#6002EE';
      await task(delay);
    }
  }
  callback();
};
