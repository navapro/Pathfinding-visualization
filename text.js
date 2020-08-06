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
  text("START NODE", height + height / 2, height / 20);
  text("END NODE", height + height / 2, height / 10);
  text("DIAGONAL PATH", height + height / 2, height / 5);
  text("SEARCH SPEED", height + height / 2, height / 3.5);

  push();
  fill(200);
  rect(height + height / 2, height / 2.5, 8 * h, 2 * h);
  rect(height + height / 2, height / 1.95, 8 * h, 2 * h);
  rect(height + height / 2, height / 1.6, 8 * h, 2 * h);
  fill(0);
  textAlign(CENTER);
  text("SEARCH", height + height / 1.51, height / 2.5 + 1.5 * h);
  text("CLEAR WALLS", height + height / 1.51, height / 1.95 + 1.5 * h);
  text("RESET", height + height / 1.51, height / 1.6 + 1.5 * h);
  pop();

  slider.position(height + height / 2 - 3.5 * h, height / 3.5 - 0.5 * h);
  fill(0, 102, 153);
  fill(0, 102, 153, 51);
}
