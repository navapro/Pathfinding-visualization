function heuristic(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  //let d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

let showPath = false;
let cols = 25;
let rows = 25;
let grid = new Array(cols);
let start;
let end;
let h;
let path = [];
let nosolution = false;
let done = false;

let released = false;
let startbool = false;
let moveStart = false;
let moveEnd = false;


let openSet = [];
let closedSet = [];


function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;


  this.show = function (col) {




    let hit = collidePointRect(mouseX, mouseY, this.i * h, this.j * h, h, h);
    if (mouseIsPressed && hit && !moveStart) {
      if (mouseButton === LEFT) {
        // add button and mouse
        if (this.wall && released) {
          this.wall = false;

        } else {

          this.wall = true;
          
        }
      }
      else if (mouseButton === RIGHT) {
        this.wall = false;
      }
    }

    if (this.wall) {
      fill(0);
    }
    else {

      fill(col);
    }


    strokeWeight(.4);

    rect(this.i * h, this.j * h, h, h);
  }
  this.addNeighbors = function (grid) {

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


function setup() {
  createCanvas(windowWidth,windowHeight);
  console.log("A*");

  
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);

  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }

  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }

  }


  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  start.wall = false;
  end.wall = false;

  openSet.push(start);

  console.log(grid);


}


function draw() {



  if (mouseIsPressed) {
    let StartTouched = collidePointRect(mouseX, mouseY, start.i * h, start.j * h, h, h);

    if (StartTouched) {
      moveStart = true;
    }
    if (moveStart) {

      let cellSize = width / cols;

      let xCoord = floor(mouseX / cellSize);
      let yCoord = floor(mouseY / cellSize);
      start = grid[xCoord][yCoord];


      openSet.splice(0, 1);
      openSet.push(start);

    }
  }



  let current;
  if (startbool && !done) {

    if (openSet.length > 0) {
      let winner = 0;

      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }

      current = openSet[winner];

      if (current === end) {

        // Find the path.
        // let temp = current;
        // path.push(temp);
        // while (temp.previous) {
        //   path.push(temp.previous);
        //   temp = temp.previous;
        // }

        console.log("done !!");
        done = true;
        path = [];
        var temp = current;
        path.push(temp);
        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }

        showPath = true;


      }

      openSet.splice(winner, 1);
      closedSet.push(current);

      var neighbors = current.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          let tempG = current.g + 1;

          let newPath = false;

          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
            newPath = true;
          }

          if (newPath) {

            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }

      }

    } else {
      // nosolution
      nosolution = true;
      // noLoop();
    }



  }
  background(0);



  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }
  for (let i = 0; i < closedSet.length; i++) {
    if (closedSet[i] != start && closedSet[i] != end) {

      closedSet[i].show(color(255, 69, 0));
    }
  }

  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i] != start && openSet[i] != end) {

      openSet[i].show(color(0, 255, 0));
    }
  }

  if (showPath) {
    push();

    noFill();
    stroke("blue");
    strokeWeight(h / 3)
    beginShape();

    for (let i = 0; i < path.length; i++) {
      vertex(path[i].i * h + h / 2, path[i].j * h + h / 2);
    }
    endShape();
    pop();
  }
  start.show(color(0, 255, 255));

}

function mouseReleased() {
  moveStart = false;
  Released = true;
}


function keyPressed() {
  if (key == " ") {
    startbool = true;

  }
}