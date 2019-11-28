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
  quickSortAlgo(
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

const timer = ms => {
  return new Promise(res => setTimeout(res, ms));
};

const task = async delay => {
  await timer(delay);
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

const swap = async (items, leftIndex, rightIndex, delay) => {
  let temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  await task(delay);
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

const partition = async (
  items,
  left,
  right,
  canvasContext,
  columnArray,
  delay,
  dimension,
  isTopDown,
  factor
) => {
  let { canvasHeight } = dimension;
  let pivotIndex = Math.floor((right + left) / 2),
    pivot = items[pivotIndex], //middle element
    i = left, //left pointer
    j = right; //right pointer
  let pivotRectHeight = getRectHeight(
    items[pivotIndex],
    canvasHeight,
    isTopDown,
    factor
  );
  columnArray[pivotIndex] = new Column(
    columnArray[pivotIndex].x,
    columnArray[pivotIndex].y,
    columnArray[pivotIndex].width,
    Math.floor(pivotRectHeight)
  );
  clearReact(
    pivotIndex,
    canvasHeight,
    canvasContext,
    columnArray,
    isTopDown,
    factor
  );
  canvasContext.fillStyle = '#FF0040';
  drawRect(pivotIndex, pivotRectHeight, canvasContext, columnArray, isTopDown);
  while (i <= j) {
    while (items[i] > pivot) {
      i++;
    }
    while (items[j] < pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, delay); //sawpping two elements
      let rectHeight1 = getRectHeight(
        items[i],
        canvasHeight,
        isTopDown,
        factor
      );
      let rectHeight2 = getRectHeight(
        items[j],
        canvasHeight,
        isTopDown,
        factor
      );
      columnArray[i] = new Column(
        columnArray[i].x,
        columnArray[i].y,
        columnArray[i].width,
        Math.floor(rectHeight1)
      );
      columnArray[j] = new Column(
        columnArray[j].x,
        columnArray[j].y,
        columnArray[j].width,
        Math.floor(rectHeight2)
      );
      clearReact(
        i,
        canvasHeight,
        canvasContext,
        columnArray,
        isTopDown,
        factor
      );
      clearReact(
        j,
        canvasHeight,
        canvasContext,
        columnArray,
        isTopDown,
        factor
      );
      canvasContext.fillStyle = '#00FF91';
      drawRect(i, rectHeight1, canvasContext, columnArray, isTopDown);
      drawRect(j, rectHeight2, canvasContext, columnArray, isTopDown);
      i++;
      j--;
    }
  }
  return i;
};

const quickSortAlgo = async (
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
  let index;
  if (items.length > 1) {
    index = await partition(
      items,
      left,
      right,
      canvasContext,
      columnArray,
      delay,
      dimension,
      isTopDown,
      factor
    ); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSortAlgo(
        items,
        left,
        index - 1,
        canvasContext,
        columnArray,
        delay,
        dimension,
        isTopDown,
        factor,
        callback
      );
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSortAlgo(
        items,
        index,
        right,
        canvasContext,
        columnArray,
        delay,
        dimension,
        isTopDown,
        factor,
        callback
      );
    }
  }
  if (left === 0 && right === columnArray.length - 1) {
    callback();
  }
};
