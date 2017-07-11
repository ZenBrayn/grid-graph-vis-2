function setup() {
  dheight = displayWidth;
  dwidth = displayHeight;
  createCanvas(dwidth, dheight);
  background(0);
  noStroke();
  
  x_center = dwidth * 0.5;
  y_center = dheight * 0.5;
  
  padding_pct = 0.10
  
  draw_mode = "single";
  
  if (draw_mode == "single") {
    
  }
    
  pt_size = 10;
  ln_size = pt_size * 0.25;
  spacing = pt_size * 10;
  
  pt_color = color(100, 255);
  ln_color = color(255, 255);
  color_state = 1;
  
  frame_rate = 1;
  frameRate(frame_rate);
  
  margin_x = 50;
  margin_y = 50;
  
  padding_x = 25;
  padding_y = 25;
  
  noLoop();
}


function draw() {
  background(0);
//   translate(100,100);
//   drawGridGraphNo(frameCount);
  drawAllGridGraphs();
}


function drawGridGraphMatrix(gg_mtrx) {
  // Figure out the max dimensions of
  // the matrix
  var n_rows = gg_mtrx.length;
  var n_cols = 0;
  for (var i=0; i<n_rows; i++) {
    n_cols = Math.max(n_cols, gg_mtrx[i].length);
  }
  print(n_rows + " " + n_cols);

  // Figure out the potential dimensions for the grid graphs
  var grid_x_px = (dwidth - (2 * margin_x) - ((n_cols - 1) * padding_x)) / n_cols ;  
  var grid_y_px = (dheight - (2 * margin_y) - ((n_rows - 1) * padding_y)) / n_rows ;
  
  // Since we want squares, set the grid graph dimensions to the min of the above;
  if (grid_x_px < grid_y_px) {
    spacing = grid_x_px;
    // Update the y padding to fill in the space;
    padding_y = (dheight - (2 * margin_y) - (n_rows * spacing)) / (n_rows - 1);
  } else {
    spacing = grid_y_px;
    // Update the y padding to fill in the space
    padding_x = (dwidth - (2 * margin_x) - (n_cols * spacing)) / (n_cols - 1);
  }
  
/*   print(dwidth);
  print(2*margin_x + (spacing * n_cols) + (n_cols - 1) * padding_x);
  
  print(dheight);
  print(2*margin_y + (spacing * n_rows) + (n_rows - 1) * padding_y); */
  
  // Now do the drawing
  for (var row=0; row<gg_mtrx.length; row++) {
  	for (var col=0; col<gg_mtrx[row].length; col++) {
  		push()
  		
  		trans_x = margin_x + (spacing + padding_x) * col;
  		trans_y = margin_y + (spacing + padding_y) * row;
  		
  		print(trans_x, trans_y);
  		
  		translate(trans_x, trans_y);
  		drawGridGraphNo(gg_mtrx[row][col]);
  		
  		pop()
  	}
  }  
}


function drawAllGridGraphs() {
  // bucket the grid graphs by number of edges
  var gg_list = []
  for (var i=0; i<=6; i++) {
    gg_list[i] = [];
  }
  
  for (var i=1; i<=64; i++) {
    var edges_on = computeGridGraphNoEdges(i);
    var n_edges = edges_on.length;
    gg_list[n_edges].push(i);
  }
  
  drawGridGraphMatrix(gg_list);
  
/*   for (var i=0; i<=6; i++) {
    push()
    translate(100, 100 * (i+1) + 25);
    var ggs = gg_list[i];
    
    for (var j=0; j<ggs.length; j++) {
      translate(100 * j + 25 * (j -1), 0);
      drawGridGraphNo(ggs[j]);
    }
    pop();
  } */
}




function drawGridGraph(edge_nos) {
  drawGraph(edge_nos);
  drawGrid();
}

function computeGridGraphNoEdges(gg_no) {
  if (gg_no < 1) {
    print("out of range; setting to 1");
    gg_no = 1;
  } else {
    gg_no = (gg_no - 1) % 64 + 1;
  }
  
  // Convert gg_no to a binary representation
  // to see which edges are set "on"
  // need to actually go from 0 - 63 for the calc
  gg_no = gg_no - 1;
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

// Draw a specific grid graph
// can be a number between 1 and 64
// representing all possible combos
function drawGridGraphNo(gg_no) {
  var edges_on = computeGridGraphNoEdges(gg_no);
  drawGraphBkg();
  drawGraph(edges_on);
  drawGrid();
}


function drawGrid(nrows = 1, ncols = 1) {
  push();
  stroke(pt_color);
  strokeWeight(pt_size);
  
  for (var i = 1; i <= 4; i++) {
    point(vertexCoords(i)[0], vertexCoords(i)[1]);
  }
  pop();
}

function drawGraphBkg() {
//   drawGraph([1,2,3,4,5,6], lnc = color(50, 255), lns = spacing * 0.025);

	push();
	fill(50, 255);
	rect(0, 0, spacing, spacing);
	pop();
}

function drawGraph(edge_nos, lnc = ln_color, lns = ln_size) {
  push()
  
  stroke(lnc);
  strokeWeight(lns);

  var n_edges = edge_nos.length;
  
  for (var i = 0; i < n_edges; i++) {
    var edge = edge_nos[i];
    line(edgeCoords(edge)[0][0], edgeCoords(edge)[0][1], 
         edgeCoords(edge)[1][0], edgeCoords(edge)[1][1])
  }
  
  pop()
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


