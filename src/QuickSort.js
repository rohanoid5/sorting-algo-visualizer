import Column from './Column';

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

const swap = (items, leftIndex, rightIndex) => {
  let temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
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

const partition = (
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
  let pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
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

const quickSortAlgo = (
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
  setTimeout(() => {
    if (items.length > 1) {
      index = partition(
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
        quickSortAlgo(
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
        quickSortAlgo(
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
  }, delay);
  callback();
};
