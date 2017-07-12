function setup() {
  dwidth = displayWidth;
  dheight = displayHeight;
  createCanvas(dwidth, dheight);
  background(0);
  noStroke();
  smooth();
  
  n_rows = 0;
  n_cols = 0;
  
  margin_left = 25;
  margin_right = 100;
  margin_top = 150;
  margin_bottom = 50;
  
  padding_x = 15;
  padding_y = 15;
  
  noLoop();

  print(dwidth + " " + dheight);
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



//--- Supporting drawing functions
//--- Individual grid graphs
function drawGridGraph(edge_nos, gg_no = -1) {
	// BACKGROUND
	push()
	fill(50);
	drawGraphBkg();
	pop()
	
	// EDGES
	push()
	stroke(255);
	strokeWeight(spacing / 10 * 0.5);
  drawGraph(edge_nos);
  pop()
  
  // GRID POINTS
  push();
  stroke(100);
  strokeWeight(spacing / 5);
  drawGrid();
  pop();

  // NO. LABEL BACKGROUND
  push();
  stroke(255);
  strokeWeight(spacing / 2.5);
  drawNoBkg();
  pop();
  
  // NO LABEL
  push();
  textAlign(CENTER, CENTER)
	fill(0);
	textSize(spacing / 5);
	noStroke();
  drawNoLabel(gg_no);
  pop();
}

// Draw a specific grid graph
// can be a number between 1 and 64
// representing all possible combos
function drawGridGraphNo(gg_no) {
  var edges_on = computeGridGraphNoEdges(gg_no);
	drawGridGraph(edges_on, gg_no);
}

function drawGrid(nrows = 1, ncols = 1) {
  for (var i = 1; i <= 4; i++) {
    point(vertexCoords(i)[0], vertexCoords(i)[1]);
  }
}

function drawGraph(edge_nos) {
  var n_edges = edge_nos.length;
  
  for (var i = 0; i < n_edges; i++) {
    var edge = edge_nos[i];
    line(edgeCoords(edge)[0][0], edgeCoords(edge)[0][1], 
         edgeCoords(edge)[1][0], edgeCoords(edge)[1][1])
  }
}

function drawGraphBkg() {
	rect(0, 0, spacing, spacing);
}

function drawNoBkg() {
  point(spacing * 0.5, spacing * 0.5);
}

function drawNoLabel(gg_no) {	
	text(gg_no, spacing * 0.5, spacing * 0.5);
}

//--- Interface and labels
function drawTitle() {
  push();
  textSize(spacing * 0.75);
  noStroke();
  fill(150);
  text("Grids No. 2", 20, 50);
  textSize(spacing * 0.25);
  fill(100);
  text("64 grid combinations", 20 * 1.15, 70)
  pop();
}

function drawLabels() {
  
  for (var row=0; row<n_rows; row++) {
    print(i);
    push();
    
  	trans_x = margin_left
  	trans_y = (margin_top + (spacing + padding_y) * row) - spacing * 0.35;
  	
  	noStroke();
  	fill(150);
  	textSize(spacing * 0.30);
  	
  	edges_txt = "Edges"
  	if (row == 1) {
  	  edges_txt = "Edge"
  	}
  	lbl_txt = String(row) + " " + edges_txt;
  	
  	text(lbl_txt, trans_x, trans_y);
  	
  	pop();
  }
  

}



//--- Drawing multiple grid graph functions
function drawAllGridGraphs() {
  // bucket the grid graphs by number of edges
  var gg_list = []
  for (var i=0; i<=6; i++) {
    gg_list[i] = [];
  }
  
  for (var i=0; i<64; i++) {
    var edges_on = computeGridGraphNoEdges(i);
    var n_edges = edges_on.length;
    gg_list[n_edges].push(i);
  }
  
  drawGridGraphMatrix(gg_list);
}

function drawGridGraphMatrix(gg_mtrx) {
  // Figure out the max dimensions of
  // the matrix
  n_rows = gg_mtrx.length;
  n_cols = 0;
  for (var i=0; i<n_rows; i++) {
    n_cols = Math.max(n_cols, gg_mtrx[i].length);
  }

  // Figure out the potential dimensions for the grid graphs
  var grid_x_px = (dwidth - (margin_left + margin_right) - ((n_cols - 1) * padding_x)) / n_cols ;  
  var grid_y_px = (dheight - (margin_top + margin_bottom) - ((n_rows - 1) * padding_y)) / n_rows ;
  
  // Since we want squares, set the grid graph dimensions to the min of the above;
  if (grid_x_px < grid_y_px) {
    spacing = grid_x_px;
    // Update the y padding to fill in the space;
    padding_y = (dheight - (margin_top + margin_bottom) - (n_rows * spacing)) / (n_rows - 1);
  } else {
    spacing = grid_y_px;
    // Update the y padding to fill in the space
    padding_x = (dwidth - (margin_left + margin_right) - (n_cols * spacing)) / (n_cols - 1);
  }
  
  
  // Now do the drawing
  for (var row=0; row<gg_mtrx.length; row++) {
  	for (var col=0; col<gg_mtrx[row].length; col++) {
  		push()
  		
  		trans_x = margin_left + (spacing + padding_x) * col;
  		trans_y = margin_top + (spacing + padding_y) * row;
  		
  		translate(trans_x, trans_y);
  		drawGridGraphNo(gg_mtrx[row][col]);
  		
  		pop()
  	}
  }  
}


//--- Utility functions
function computeGridGraphNoEdges(gg_no) {
  if (gg_no < 0) {
    print("out of range; setting to 0");
    gg_no = 0;
  } else {
    gg_no = gg_no % 64;
  }
  
  // Convert gg_no to a binary representation
  // to see which edges are set "on"
  // need to actually go from 0 - 63 for the calc
  var gg_bin = (+gg_no).toString(2)
  
  var pad = "000000"
  gg_bin = (pad + gg_bin).slice(-pad.length);
  
  var edges_on = [];
  for (i=0; i<6; i++) {
    if (gg_bin[i] == null || gg_bin[i] == 0) {
      continue;
    } else {
      edges_on.push(6-i);
    } 
  }
  return(edges_on);  
}

function vertexCoords(vertex_no) {
  switch (vertex_no) {
    case 1:
      return([0, 0]);
    case 2:
      return([spacing, 0]);
    case 3:
      return([spacing, spacing]);
    case 4:
      return([0, spacing]);
    default:
      return([0, 0]);
  }
}

function edgeCoords(edge_no) {
  switch (edge_no) {
    case 1:
      return([vertexCoords(1), vertexCoords(2)]);
    case 2:
      return([vertexCoords(2), vertexCoords(3)]);
    case 3:
      return([vertexCoords(4), vertexCoords(3)]);
    case 4:
      return([vertexCoords(4), vertexCoords(1)]);
    case 5:
      return([vertexCoords(1), vertexCoords(3)]);
    case 6:
      return([vertexCoords(2), vertexCoords(4)]);
  }
}


