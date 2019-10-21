import React, { useRef, useEffect, useState } from 'react';
import Column from './Column';
import { bubbleSort } from './BubbleSort';
import './App.css';

const RECT_WIDTH = 20;
const GUTTER = 4;
const CANVAS_PADDING = 4;
const DELAY = 400;

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
  const [speed, setSpeed] = useState(4);
  const [disabled, setDisabled] = useState(false);

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

  const onBubbleSort = () => {
    setDisabled(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    bubbleSort(data, ctx, bottomUpColumns, DELAY / speed, dimension, () => {
      setDisabled(false);
    });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: 1000,
          padding: '16px 0px',
          margin: '0px auto'
        }}
      >
        <div style={{ marginRight: 16 }}>
          <p style={{ display: 'flex', justifyContent: 'space-between' }}>
            Number of columns:{' '}
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>
              {numColumns}
            </span>
          </p>
          <input
            disabled={disabled}
            style={{ width: 200 }}
            type="range"
            min="2"
            max="199"
            value={numColumns}
            onChange={onNumColumnsChange}
          />
        </div>
        <div style={{ marginRight: 16 }}>
          <p style={{ display: 'flex', justifyContent: 'space-between' }}>
            Speed:{' '}
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>
              x{speed / 4}
            </span>
          </p>
          <input
            disabled={disabled}
            style={{ width: 200 }}
            type="range"
            min="1"
            max="8"
            value={speed}
            onChange={e => setSpeed(e.target.value)}
          />
        </div>
        <button disabled={disabled} onClick={onBubbleSort}>
          SORT
        </button>
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
