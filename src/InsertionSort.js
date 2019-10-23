import Column from './Column';

export const insertionSort = (
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
  const { canvasHeight } = dimension;
  for (let i = 1; i < length; i++) {
    let curr = data[i];
    let currRectHeight = data[i] * (canvasHeight / 2);
    let j = i;
    while (j > 0 && data[j - 1] > curr) {
      let prevRectHeight = data[j - 1] * (canvasHeight / 2);
      columnArray[j] = new Column(
        columnArray[j].x,
        columnArray[j].y,
        columnArray[j].width,
        isTopDown
          ? Math.floor(canvasHeight / 2 - prevRectHeight)
          : Math.floor(-canvasHeight / 2 + prevRectHeight)
      );
      if (isTopDown) {
        canvasContext.clearRect(
          columnArray[j].x,
          0,
          Math.ceil(columnArray[j].width),
          canvasHeight / 2
        );
      } else {
        canvasContext.clearRect(
          columnArray[j].x,
          canvasHeight / 2,
          Math.ceil(columnArray[j].width),
          canvasHeight / 2
        );
      }
      canvasContext.fillStyle = '#00FF91';
      canvasContext.fillRect(
        columnArray[j].x,
        isTopDown ? 0 : canvasHeight,
        columnArray[j].width,
        isTopDown
          ? Math.floor(canvasHeight / 2 - prevRectHeight)
          : Math.floor(-canvasHeight / 2 + prevRectHeight)
      );
      data[j] = data[j - 1];
      j--;
      await task(delay);
    }
    columnArray[j] = new Column(
      columnArray[j].x,
      columnArray[j].y,
      columnArray[j].width,
      isTopDown
        ? Math.floor(canvasHeight / 2 - currRectHeight)
        : Math.floor(-canvasHeight / 2 + currRectHeight)
    );
    if (isTopDown) {
      canvasContext.clearRect(
        columnArray[j].x,
        0,
        Math.ceil(columnArray[j].width),
        canvasHeight / 2
      );
    } else {
      // canvasContext.clearRect(
      //   columnArray[j].x,
      //   canvasHeight / 2,
      //   Math.ceil(columnArray[j].width),
      //   canvasHeight / 2
      // );
    }
    canvasContext.fillStyle = '#00FF91';
    canvasContext.fillRect(
      columnArray[j].x,
      isTopDown ? 0 : canvasHeight,
      columnArray[j].width,
      isTopDown
        ? Math.floor(canvasHeight / 2 - currRectHeight)
        : Math.floor(-canvasHeight / 2 + currRectHeight)
    );
    data[j] = curr;
  }
  callback();
};
