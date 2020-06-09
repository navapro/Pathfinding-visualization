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



