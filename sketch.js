// Project Title
let cols = 25;
let rows = 25;
let grid = [];
let w;
let h;
let path = [];

let openSet = [];
let closedSet = [];

let startNode;
let endNode;

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if (random(1) < 0.3) {
    this.wall = true;
  }


function setup() {

  // Create a 2D array using for loop.
  createCanvas(400, 400);


  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid.push([]);
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
  startNode = grid[0][0];
  endNode = grid[cols - 1][rows - 1];

  openSet.push(startNode);


}

function draw() {
  let current;

  if (openSet.length > 0) {
    

   
  } else {
    // nosolution
    nosolution = true;
    noLoop();
  }
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 69, 0));
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }


 
}

