class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cells: Cell[] = [];
  cellSize: number = 20;
  cellsPerRow: number;
  cellsPerCol: number;
  running: boolean = false;
  interval: number;
  speedInterval: number = 1000;

  /**
   * Constructs a new Game and creates
   * all the cells for the game
   */
  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");

    let canvasWidth = parseInt(this.canvas.getAttribute("width"));
    this.cellsPerRow = canvasWidth / this.cellSize;

    let canvasHeight = parseInt(this.canvas.getAttribute("height"));
    this.cellsPerCol = canvasHeight / this.cellSize;

    for (let y = 0; y < this.cellsPerCol; y++) {
      for (let x = 0; x < this.cellsPerRow; x++) {
        this.cells[y * this.cellsPerRow + x] = new Cell(x, y, this);
        this.cells[y * this.cellsPerRow + x].draw();
      }
    }

    this.addMouseListener();
  }

  /**
   * Lets the user kill and create
   * cells by clicking on the canvas
   */
  addMouseListener() {
    this.canvas.addEventListener("mousedown", e => {
      let x = Math.floor(e.offsetX / this.cellSize);
      let y = Math.floor(e.offsetY / this.cellSize);
      let cell = this.getCell(y * this.cellsPerRow + x);
      if (cell) {
        cell.age = 0;
        cell.isAlive = !cell.isAlive;
        cell.nextIsAlive = cell.isAlive;
        cell.draw();
      }
    });
  }

  /**
   * Will return the cell of a given index
   * @param index The index of the cell
   * that should be returned
   */
  getCell(index): Cell {
    if (index < 0) return null;
    return this.cells[index];
  }

  /**
   * Starts the interval
   */
  start() {
    this.running = true;
    this.interval = setInterval(() => {
      this.cells.forEach(cell => {
        cell.draw();
        cell.updateLife();
      });

      this.cells.forEach(cell => {
        cell.isAlive = cell.nextIsAlive;
      });

    }, this.speedInterval);
  }

  /**
   * Stops the interval
   */
  stop() {
    this.running = false;
    clearInterval(this.interval);
  }

  /**
   * Kill all cells
   */
  clear() {
    this.cells.forEach(cell => {
      cell.isAlive = false;
      cell.draw();
    });
  }

  /**
   * Loop through all cells and randomly set
   * them alive or dead
   */
  randomize() {
    this.cells.forEach(cell => {
      let alive = Math.round(Math.random());
      cell.isAlive = alive === 1 ? true : false;
      cell.age = 0;
      cell.draw();
    });
  }
}
