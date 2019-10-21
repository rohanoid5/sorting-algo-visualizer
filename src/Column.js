class Column {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  setHeight(height) {
    this.height = height;
  }
}

export default Column;
