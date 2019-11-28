import Column from '../Column';

export const quickSort = (
  dataParam,
  canvasContext,
  columnArray,
  delay = 0,
  dimension,
  isTopDown,
  isCompareModeOn,
  callback
) => {
  let data = dataParam.slice(0);
  let low = 0;
  let high = data.length - 1;
  mergeSortAlgo(
    data,
    low,
    high,
    canvasContext,
    columnArray,
    delay,
    dimension,
    isTopDown,
    isCompareModeOn ? 2 : 1,
    callback
  );
};

const getRectHeight = (value, canvasHeight, isTopDown, factor) => {
  if (isTopDown) {
    return canvasHeight / factor - value * (canvasHeight / factor);
  } else {
    return value * (canvasHeight / factor) - canvasHeight / factor;
  }
};

const clearReact = (
  i,
  canvasHeight,
  canvasContext,
  columnArray,
  isTopDown,
  factor
) => {
  if (isTopDown) {
    canvasContext.clearRect(
      columnArray[i].x,
      0,
      Math.ceil(columnArray[i].width),
      canvasHeight / 2
    );
  } else {
    canvasContext.clearRect(
      columnArray[i].x,
      factor === 2 ? canvasHeight / factor : 0,
      Math.ceil(columnArray[i].width),
      canvasHeight / factor
    );
  }
};

const drawRect = (i, reactHeight, canvasContext, columnArray, isTopDown) => {
  if (!isTopDown) {
    canvasContext.fillRect(
      columnArray[i].x,
      columnArray[i].y,
      columnArray[i].width,
      Math.ceil(reactHeight)
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

const mergeSortAlgo = (
  items,
  left,
  right,
  canvasContext,
  columnArray,
  delay,
  dimension,
  isTopDown,
  factor,
  callback
) => {
  setTimeout(() => {}, delay);
  callback();
};
