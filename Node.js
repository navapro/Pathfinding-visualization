class Node {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
  }

  show(colr) {
    let hit = collidePointRect(mouseX, mouseY, this.i * h, this.j * h, h, h);
    if (mouseIsPressed && hit && !moveStart && !moveEnd) {
      if (mouseButton === LEFT) {
        // add button and mouse
        if (this.wall && released) {
          this.wall = false;
        } else {
          this.wall = true;
        }
      } else if (mouseButton === RIGHT) {
        this.wall = false;
      }
    }

    if (this.wall) {
      fill(0);
    } else {
      fill(colr);
    }

    strokeWeight(0.4);

    rect(this.i * h, this.j * h, h, h);
  }
  addNeighbors() {
    var i = this.i;
    var j = this.j;

    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (checkbox) {
      if (i > 0 && j > 0) {
        this.neighbors.push(grid[i - 1][j - 1]);
      }
      if (i < cols - 1 && j > 0) {
        this.neighbors.push(grid[i + 1][j - 1]);
      }
      if (i > 0 && j < rows - 1) {
        this.neighbors.push(grid[i - 1][j + 1]);
      }
      if (i < cols - 1 && j < rows - 1) {
        this.neighbors.push(grid[i + 1][j + 1]);
      }
    }
  }
}
