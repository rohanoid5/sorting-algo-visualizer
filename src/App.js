import React, { useRef, useEffect, useState } from 'react';
import Column from './Column';
import { bubbleSort } from './SortingAlgorithms';

const RECT_WIDTH = 20;
const GUTTER = 4;
const CANVAS_PADDING = 4;

let bottomUpColumns;
let topDownColumns;
let data = [];

const drawColumn = (ctx, xpos, ypos, width = RECT_WIDTH, height) => {
  ctx.fillStyle = '#6002EE';
  ctx.fillRect(xpos, ypos, width, height);
};

const draw = (canvasRef, dimension, numOfRects) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const { canvasWidth, canvasHeight } = dimension;

  topDownColumns = [];
  bottomUpColumns = [];
  data = [];

  if (canvasWidth) {
    const rectWidth =
      (canvasWidth - 2 * CANVAS_PADDING - (numOfRects - 1) * GUTTER) /
      numOfRects;
    let xPos = 0;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < numOfRects; i++) {
      let value = Math.random();
      let rectHeight = value * (canvasHeight / 2);
      drawColumn(
        ctx,
        Math.floor(xPos),
        0,
        Math.floor(rectWidth),
        Math.floor(canvasHeight / 2 - rectHeight)
      );
      drawColumn(
        ctx,
        Math.floor(xPos),
        Math.floor(canvasHeight),
        Math.floor(rectWidth),
        Math.floor(-canvasHeight / 2 + rectHeight)
      );
      topDownColumns.push(
        new Column(
          Math.floor(xPos),
          0,
          Math.floor(rectWidth),
          Math.floor(canvasHeight / 2 - rectHeight)
        )
      );
      bottomUpColumns.push(
        new Column(
          Math.floor(xPos),
          Math.floor(canvasHeight),
          Math.floor(rectWidth),
          Math.floor(-canvasHeight / 2 + rectHeight)
        )
      );
      xPos += rectWidth + GUTTER;
      data.push(value);
    }
  }
};

const App = () => {
  const canvasRef = useRef(null);
  const [dimension, setDimension] = useState({
    xPos: 0,
    yPox: 0,
    canvasWidth: 0,
    canvasHeight: 0
  });
  const [numColumns, setNumColumns] = useState(20);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasX = canvas.getBoundingClientRect().x;
    const canvasY = canvas.getBoundingClientRect().x;
    const canvasWidth = canvas.getBoundingClientRect().width;
    const canvasHeight = canvas.getBoundingClientRect().height;
    setDimension({
      xPos: canvasX,
      yPox: canvasY,
      canvasHeight,
      canvasWidth
    });
  }, []);

  useEffect(() => {
    if (dimension.canvasWidth) draw(canvasRef, dimension, numColumns);
  }, [dimension, numColumns]);

  const onNumColumnsChange = e => {
    const value = e.target.value;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { canvasWidth, canvasHeight } = dimension;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    setNumColumns(value);
  };

  const onUpdate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    (function myLoop(i) {
      setTimeout(function() {
        let firstColumn = bottomUpColumns[numColumns - i];
        let secondColumn = bottomUpColumns[numColumns - i + 1];

        ctx.clearRect(
          firstColumn.x,
          dimension.canvasHeight / 2,
          Math.ceil(firstColumn.width + secondColumn.width) + 8,
          dimension.canvasHeight / 2
        );
        ctx.fillRect(
          firstColumn.x,
          secondColumn.y,
          firstColumn.width,
          secondColumn.height
        );
        ctx.fillRect(
          secondColumn.x,
          firstColumn.y,
          secondColumn.width,
          firstColumn.height
        );
        if (i-- && numColumns - i + 1 < bottomUpColumns.length) {
          myLoop(i);
        }
      }, 100);
    })(numColumns);
  };

  const onBubbleSort = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    bubbleSort(data, ctx, bottomUpColumns, 100, dimension);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: 1000,
          padding: '32px 0px',
          margin: '0px auto'
        }}
      >
        <input
          type="range"
          min="2"
          max="199"
          value={numColumns}
          onChange={onNumColumnsChange}
        />
        <button onClick={onBubbleSort}>Update</button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <canvas
          style={{
            padding: `0px ${CANVAS_PADDING}px`,
            margin: '0px',
            border: '1px solid'
          }}
          ref={canvasRef}
          width={990}
          height={window.innerHeight - 64 * 2}
        />
      </div>
    </div>
  );
};
export default App;
