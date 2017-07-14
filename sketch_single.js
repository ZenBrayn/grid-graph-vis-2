function setup() {  
  // Using a fixed size for consistent display
  // across devices
  canvas_dim = 60;
  createCanvas(canvas_dim, canvas_dim);

  margin = canvas_dim * 0.20;

  spacing = canvas_dim - 2 * margin;
  background(0);
  noStroke();
  smooth();

  noLoop();
}

//--- Main drawing function
function draw() {
  // Refresh the background;
  background(0);

  // Grid graphs
  var gg_no = 63;
  translate(margin, margin);
  drawGridGraphNo(gg_no);

  var fn = "grid_graph_" + gg_no
  saveCanvas(fn, "png")
}
