function setup() {  
  // Using a fixed size for consistent display
  // across devices
  canvas_dim = 250;
  createCanvas(canvas_dim, canvas_dim);

  margin = canvas_dim * 0.20;

  spacing = canvas_dim - 2 * margin;
  background(0);
  noStroke();
  smooth();
  frameRate(2);
}

//--- Main drawing function
function draw() {
  // Refresh the background;
  background(0);

  // Grid graphs
  var gg_no = (frameCount - 1) % 64;
  translate(margin, margin);
  drawGridGraphNo(gg_no);
}
