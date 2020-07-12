function heuristic(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  // let d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}
let slider;
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

let unchecked, checked;
let checkbox = false;

function preload() {
  unchecked = loadImage("assets/checkbox_unchecked.png");
  checked = loadImage("assets/checkbox_checked.png");
}
function showImage() {

  push();
  imageMode(CORNER);
  if (checkbox) {
    image(checked, height + height / 2 - 2 * h, height / 5 - h / 1.1, h, h);
  } else {
    image(unchecked, height + height / 2 - 2 * h, height / 5 - h / 1.1, h, h);
  }
  pop();
}

class Node {

  constructor(i, j) {

    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.gg = 0;
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
      }
      else if (mouseButton === RIGHT) {
        this.wall = false;
      }
    }

    if (this.wall) {
      fill(0);
    }
    else {

      fill(colr);
    }


    strokeWeight(.4);

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
        this.neighbors[this.neighbors.length - 1].gg = 0;// change it for diagonal search 
      }
      if (i < cols - 1 && j > 0) {
        this.neighbors.push(grid[i + 1][j - 1]);
        this.neighbors[this.neighbors.length - 1].gg = 0;// change it for diagonal search 
      }
      if (i > 0 && j < rows - 1) {
        this.neighbors.push(grid[i - 1][j + 1]);
        this.neighbors[this.neighbors.length - 1].gg = 0;// change it for diagonal search 
      }
      if (i < cols - 1 && j < rows - 1) {
        this.neighbors.push(grid[i + 1][j + 1]);

        this.neighbors[this.neighbors.length - 1].gg = 0;// change it for diagonal search 
        console.log("this done")

      }
    }
  }

}


function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(-10, -1, -1, -1);
  slider.style('width', '80px');


  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);

  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Node(i, j);
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

}

function move() {
  let cellSize = height / cols;

  let xCoord = floor(mouseX / cellSize);
  let yCoord = floor(mouseY / cellSize);

  return grid[xCoord][yCoord];
}

function mouseCheck() {
  let x = mouseX;
  let y = mouseY;
  let h = height;

  if (x < h && x > 0 && y > 0 && y < h) {
    return true;
  }
}

function draw() {


  if (mouseIsPressed && mouseCheck()) {
    let startTouched = collidePointRect(mouseX, mouseY, start.i * h, start.j * h, h, h);
    let endTouched = collidePointRect(mouseX, mouseY, end.i * h, end.j * h, h, h);

    if (startTouched) {
      moveStart = true;
    }
    if (endTouched) {
      moveEnd = true;
    }

    if (moveEnd) {
      end = move();
    }

    if (moveStart) {
      start = move();
      openSet.splice(0, 1);
      openSet.push(start);
    }
  }



  let current;
  if (frameCount % (-1 * slider.value()) == 0) {
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
            let tempG = current.g + neighbor.gg;


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

  }
  background(255);
  showText();


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
  end.show(color(255, 0, 255));
  start.show(color(0, 255, 255));

}

function mouseReleased() {
  moveStart = false;
  moveEnd = false;
  Released = true;
}


function keyPressed() {
  if (key == " ") {
    startbool = true;

  }

  if (key == "r") {
    startbool = false;
    closedSet = [];
    openSet = [];
    path = [];
    nosolution = false;
    done = false;

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    start.wall = false;
    end.wall = false;

    openSet.push(start);
  }

}

function showText() {

  end.show(color(255, 0, 255));
  start.show(color(0, 255, 255));

  push();
  fill(0, 255, 255);
  rect(height + height / 2 - 2 * h, height / 20 - h / 1.1, h, h);
  pop();
  push();
  fill(255, 0, 255);
  rect(height + height / 2 - 2 * h, height / 10 - h / 1.1, h, h);
  pop();
  showImage();
  fill(0);

  textSize(32);
  text('START NODE', height + height / 2, height / 20);
  text('END NODE', height + height / 2, height / 10);
  text('DIAGONAL PATH', height + height / 2, height / 5);
  text('SEARCH SPEED', height + height / 2, height / 3.5);

  push()
  fill(200);
  rect(height + height / 2, height / 2.5, 8 * h, 2 * h);
  rect(height + height / 2, height / 1.95, 8 * h, 2 * h);
  rect(height + height / 2, height / 1.6, 8 * h, 2 * h);
  fill(0);
  textAlign(CENTER);
  text('SEARCH', height + height / 1.51, height / 2.5 + 1.5 * h);
  text('CLEAR WALLS', height + height / 1.51, height / 1.95 + 1.5 * h);
  text('RESET', height + height / 1.51, height / 1.6 + 1.5 * h);
  pop()

  slider.position(height + height / 2 - 3.5 * h, height / 3.5 - .5 * h);
  fill(0, 102, 153);
  text('word', 10, 60);
  fill(0, 102, 153, 51);
  text('word', 10, 90);
}

function mousePressed() {
  if (collidePointRect(mouseX, mouseY, height + height / 2 - 2 * h, height / 5 - h / 1.1, h, h)) {
    checkbox = !checkbox;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].neighbors = [];
      }

    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].addNeighbors(grid);
      }

    }

  }
}

// TODO: text size based on h.