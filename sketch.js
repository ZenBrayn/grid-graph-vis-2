function setup() {  
  // Using a fixed size for consistent display
  // across devices
  dwidth = 1500;
  dheight = 900;
  createCanvas(dwidth, dheight);

  background(0);
  noStroke();
  smooth();
  
  n_rows = 0;
  n_cols = 0;
  
  margin_left = 50;
  margin_right = 50;
  margin_top = 150;
  margin_bottom = 50;
  
  padding_x = 20;
  padding_y = 20;

  noLoop();
}

//--- Main drawing function
function draw() {
  // Refresh the background;
  background(0);

  // Grid graphs
  drawAllGridGraphs();

  // Title
  drawTitle();

  // Labels
  drawLabels();
}
