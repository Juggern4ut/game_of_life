var Cell = /** @class */ (function () {
    /**
     * Will create a new cell and set it's initial states
     * @param x X-Coordinate of the cell
     * @param y Y-Coordinate of the cell
     * @param canvas The Canvas game object
     */
    function Cell(x, y, canvas) {
        this.age = 0;
        this.x = x;
        this.y = y;
        this.canvas = canvas;
    }
    /**
     * Will return the amount of alive cells
     * adjacent to the current cell
     * @returns {number} The number of ajacent alive cells
     */
    Cell.prototype.getAdjacentLiveCells = function () {
        var adjacentAliveCells = 0;
        var currentCell;
        for (var i = -3; i < 6; i++) {
            var yOffset = Math.floor(i / 3);
            var xOffset = i - yOffset * 3 - 1;
            //Don't count the current cell to the alive adjacent cells
            if (yOffset === 0 && xOffset === 0)
                continue;
            currentCell = this.canvas.getCell((this.y + yOffset) * this.canvas.cellsPerRow + (this.x + xOffset));
            if (currentCell && currentCell.isAlive) {
                adjacentAliveCells++;
            }
        }
        return adjacentAliveCells;
    };
    /**
     * Will apply the rules of Conway game of life
     * to change the status of the cell to either dead
     * or alive
     * @returns {void}
     */
    Cell.prototype.updateLife = function () {
        var adjacentCells = this.getAdjacentLiveCells();
        if (adjacentCells === 3) {
            this.nextIsAlive = true;
        }
        else if (adjacentCells === 2 && this.isAlive) {
            this.age++;
        }
        else {
            this.nextIsAlive = false;
        }
    };
    /**
     * Will draw the cell to the canvas. The older the
     * cell the more red it will appear
     * @returns {void}
     */
    Cell.prototype.draw = function () {
        if (this.isAlive) {
            var saturation = this.age > 25 ? 50 : this.age * 2;
            this.canvas.ctx.fillStyle = "hsl(0," + saturation + "%,50%)";
        }
        else {
            this.canvas.ctx.fillStyle = "#fff";
        }
        this.canvas.ctx.fillRect(this.x * this.canvas.cellSize, this.y * this.canvas.cellSize, this.canvas.cellSize, this.canvas.cellSize);
    };
    return Cell;
}());
