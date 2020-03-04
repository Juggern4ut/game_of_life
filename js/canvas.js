var Canvas = /** @class */ (function () {
    /**
     * Constructs a new Game and creates
     * all the cells for the game
     */
    function Canvas() {
        this.cells = [];
        this.cellSize = 20;
        this.running = false;
        this.speedInterval = 1000;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        var canvasWidth = parseInt(this.canvas.getAttribute("width"));
        this.cellsPerRow = canvasWidth / this.cellSize;
        var canvasHeight = parseInt(this.canvas.getAttribute("height"));
        this.cellsPerCol = canvasHeight / this.cellSize;
        for (var y = 0; y < this.cellsPerCol; y++) {
            for (var x = 0; x < this.cellsPerRow; x++) {
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
    Canvas.prototype.addMouseListener = function () {
        var _this = this;
        this.canvas.addEventListener("mousedown", function (e) {
            var x = Math.floor(e.offsetX / _this.cellSize);
            var y = Math.floor(e.offsetY / _this.cellSize);
            var cell = _this.getCell(y * _this.cellsPerRow + x);
            if (cell) {
                cell.age = 0;
                cell.isAlive = !cell.isAlive;
                cell.nextIsAlive = cell.isAlive;
                cell.draw();
            }
        });
    };
    /**
     * Will return the cell of a given index
     * @param index The index of the cell
     * that should be returned
     */
    Canvas.prototype.getCell = function (index) {
        if (index < 0)
            return null;
        return this.cells[index];
    };
    /**
     * Starts the interval
     */
    Canvas.prototype.start = function () {
        var _this = this;
        this.running = true;
        this.interval = setInterval(function () {
            _this.cells.forEach(function (cell) {
                cell.draw();
                cell.updateLife();
            });
            _this.cells.forEach(function (cell) {
                cell.isAlive = cell.nextIsAlive;
            });
        }, this.speedInterval);
    };
    /**
     * Stops the interval
     */
    Canvas.prototype.stop = function () {
        this.running = false;
        clearInterval(this.interval);
    };
    /**
     * Kill all cells
     */
    Canvas.prototype.clear = function () {
        this.cells.forEach(function (cell) {
            cell.isAlive = false;
            cell.draw();
        });
    };
    /**
     * Loop through all cells and randomly set
     * them alive or dead
     */
    Canvas.prototype.randomize = function () {
        this.cells.forEach(function (cell) {
            var alive = Math.round(Math.random());
            cell.isAlive = alive === 1 ? true : false;
            cell.age = 0;
            cell.draw();
        });
    };
    return Canvas;
}());
