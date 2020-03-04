class Cell {
  x: number;
  y: number;
  age: number = 0;
  isAlive: boolean;
  nextIsAlive: boolean;
  canvas: Canvas;

  /**
   * Will create a new cell and set it's initial states
   * @param x X-Coordinate of the cell
   * @param y Y-Coordinate of the cell
   * @param canvas The Canvas game object
   */
  constructor(x: number, y: number, canvas: Canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
  }

  /**
   * Will return the amount of alive cells
   * adjacent to the current cell
   * @returns {number} The number of ajacent alive cells
   */
  getAdjacentLiveCells(): number {
    let adjacentAliveCells: number = 0;
    let currentCell: Cell | boolean;

    for (let i = -3; i < 6; i++) {
      let yOffset = Math.floor(i / 3);
      let xOffset = i - yOffset * 3 - 1;

      //Don't count the current cell to the alive adjacent cells
      if (yOffset === 0 && xOffset === 0) continue;

      currentCell = this.canvas.getCell(
        (this.y + yOffset) * this.canvas.cellsPerRow + (this.x + xOffset)
      );

      if (currentCell && currentCell.isAlive) {
        adjacentAliveCells++;
      }
    }

    return adjacentAliveCells;
  }

  /**
   * Will apply the rules of Conway game of life
   * to change the status of the cell to either dead
   * or alive
   * @returns {void}
   */
  updateLife(): void {
    let adjacentCells = this.getAdjacentLiveCells();

    if (adjacentCells === 3) {
      this.nextIsAlive = true;
    } else if (adjacentCells === 2 && this.isAlive) {
      this.age++;
    } else {
      this.nextIsAlive = false;
    }
  }

  /**
   * Will draw the cell to the canvas. The older the
   * cell the more red it will appear
   * @returns {void}
   */
  draw(): void {
    if (this.isAlive) {
      let saturation = this.age > 25 ? 50 : this.age * 2;
      this.canvas.ctx.fillStyle = "hsl(0," + saturation + "%,50%)";
    } else {
      this.canvas.ctx.fillStyle = "#fff";
    }

    this.canvas.ctx.fillRect(
      this.x * this.canvas.cellSize,
      this.y * this.canvas.cellSize,
      this.canvas.cellSize,
      this.canvas.cellSize
    );
  }
}
