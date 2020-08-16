function backTrack(current) {
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
