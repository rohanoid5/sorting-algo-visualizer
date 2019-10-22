import React, { useRef, useEffect, useState } from 'react';
import Column from './Column';
import { bubbleSort } from './BubbleSort';
import './App.css';

import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200
  },
  button: {
    margin: theme.spacing(2)
  }
}));

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
    console.log(data);
  }
};

const App = ({ toggleDarkTheme, isDarkMode }) => {
  const classes = useStyles();
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
  const [sortingAlgo, setSortingAlgo] = useState('Bubble Sort');
  const [isCompareModeOn, setCompareMode] = useState(false);

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

  const onBubbleSort = () => {
    setDisabled(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    bubbleSort(data, ctx, bottomUpColumns, DELAY / speed, dimension, () => {
      setDisabled(false);
    });
  };

  const handleChange = event => {
    setSortingAlgo(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: 1000,
          padding: '0px',
          margin: '0px auto'
        }}
      >
        <div>
          <div style={{ marginRight: 16 }}>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              Size of Data:
              <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                {numColumns}
              </span>
            </p>
            <Slider
              disabled={disabled}
              style={{ width: 200 }}
              value={numColumns}
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="auto"
              step={1}
              min={2}
              max={180}
              onChange={(e, v) => {
                setNumColumns(v);
              }}
            />
          </div>
          <div style={{ marginRight: 8 }}>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              Speed
              <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                x{speed / 4}
              </span>
            </p>
            <Slider
              disabled={disabled}
              style={{ width: 200 }}
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="auto"
              min={1}
              max={32}
              value={speed}
              onChange={(e, v) => setSpeed(v)}
            />
          </div>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">
              {isCompareModeOn
                ? 'Select first Algorithm'
                : 'Select an Algorithm'}
            </InputLabel>
            <Select value={sortingAlgo} onChange={handleChange}>
              <MenuItem value="Bubble Sort">Bubble Sort</MenuItem>
              <MenuItem value="Quick Sort">Quick Sort</MenuItem>
              <MenuItem value="Insertion Sort">Insertion Sort</MenuItem>
            </Select>
          </FormControl>
          {isCompareModeOn ? (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">
                Select second Algorithm
              </InputLabel>
              <Select value={sortingAlgo} onChange={handleChange}>
                <MenuItem value="Bubble Sort">Bubble Sort</MenuItem>
                <MenuItem value="Quick Sort">Quick Sort</MenuItem>
                <MenuItem value="Insertion Sort">Insertion Sort</MenuItem>
              </Select>
            </FormControl>
          ) : null}
        </form>
        <Button
          disabled={disabled}
          onClick={onBubbleSort}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Sort
        </Button>
        <FormControlLabel
          control={
            <Switch
              checked={isCompareModeOn}
              onChange={e => setCompareMode(e.target.checked)}
            />
          }
          labelPlacement="top"
          label={isCompareModeOn ? 'Disable Comparison' : 'Enable Comparison'}
        />
        <IconButton
          edge="end"
          aria-label="toggle dark mode"
          aria-controls="menu-appbar"
          onClick={toggleDarkTheme}
          color="inherit"
        >
          {isDarkMode ? <WbSunnyIcon /> : <Brightness2Icon />}
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <canvas
          style={{
            padding: `${CANVAS_PADDING}px`,
            margin: '0px',
            border: !isDarkMode ? '2px solid #6002EE' : '2px solid #6002EE'
          }}
          ref={canvasRef}
          width={990}
          height={window.innerHeight - 180}
        />
      </div>
    </div>
  );
};
export default App;
