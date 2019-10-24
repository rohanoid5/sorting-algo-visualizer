import Column from './Column';

export const insertionSort = (
  data,
  canvasContext,
  columnArray,
  delay = 0,
  dimension,
  isTopDown,
  isCompareModeOn
) => {
  nestedLoop(
    data,
    canvasContext,
    columnArray,
    delay,
    dimension,
    isTopDown,
    isCompareModeOn ? 2 : 1
  );
};

const timer = ms => {
  return new Promise(res => setTimeout(res, ms));
};

const task = async delay => {
  await timer(delay);
};

const nestedLoop = async (
  dataArg,
  canvasContext,
  columnArray,
  delay,
  dimension,
  isTopDown,
  factor
) => {
  const data = dataArg.slice(0);
  const length = data.length;
  const { canvasHeight } = dimension;
  for (let i = 1; i < length; i++) {
    let curr = data[i];
    let currRectHeight = data[i] * (canvasHeight / factor);
    let j = i;
    while (j > 0 && data[j - 1] < curr) {
      let prevRectHeight = data[j - 1] * (canvasHeight / factor);
      columnArray[j] = new Column(
        columnArray[j].x,
        columnArray[j].y,
        columnArray[j].width,
        isTopDown
          ? Math.floor(canvasHeight / factor - prevRectHeight)
          : Math.floor(-canvasHeight / factor + prevRectHeight)
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
          factor === 2 ? canvasHeight / factor : 0,
          Math.ceil(columnArray[j].width),
          canvasHeight / factor
        );
      }
      canvasContext.fillStyle = '#00FF91';
      canvasContext.fillRect(
        columnArray[j].x,
        isTopDown ? 0 : canvasHeight,
        columnArray[j].width,
        isTopDown
          ? Math.floor(canvasHeight / factor - prevRectHeight)
          : Math.floor(-canvasHeight / factor + prevRectHeight)
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
        ? Math.floor(canvasHeight / factor - currRectHeight)
        : Math.floor(-canvasHeight / factor + currRectHeight)
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
        factor === 2 ? canvasHeight / factor : 0,
        Math.ceil(columnArray[j].width),
        canvasHeight / factor
      );
    }
    canvasContext.fillStyle = '#00FF91';
    canvasContext.fillRect(
      columnArray[j].x,
      isTopDown ? 0 : canvasHeight,
      columnArray[j].width,
      isTopDown
        ? Math.floor(canvasHeight / factor - currRectHeight)
        : Math.floor(-canvasHeight / factor + currRectHeight)
    );
    data[j] = curr;
  }
  console.log(data);
};
