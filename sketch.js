function setup() {
  sheight = displayWidth;
  swidth = displayHeight;
  createCanvas(swidth, sheight);
  background(0);
  noStroke();
  
  x_center = swidth * 0.5;
  y_center = sheight * 0.5;
  
  pt_size = 10;
  ln_size = pt_size * 0.25;
  spacing = pt_size * 10;
  
  pt_color = color(100, 5);
  ln_color = color(255, 5);
  color_state = 1;
  
  n_row = 7;
  n_col = 10;
  
  frame_rate = 25;
  frameRate(frame_rate);
  
  draw_mode = "single";
}



function draw() {
  // background(0);  
  translate(100, 100);
  
  // the full animation
  if (draw_mode == "full") {
    // if (frameCount % (frame_rate * 10) == 0) {
    //   if (color_state == 0) {
    //     pt_color = color(100, 5);
    //     ln_color = color(255, 5);
    //     color_state = 1;
    //     print(color_state);
    //   } else {
    //     pt_color = color(0, 20);
    //     ln_color = color(0, 20);
    //     color_state = 0;
    //     print(color_state);   
    //   }
    // }
    
    var vertices = [];
    var n_vertices = 0;  
    
    for (var i = 0; i < n_col; i++) {
      for (var j = 0; j < n_row; j++) {
        push();
        
        translate(spacing * i, spacing * j);
        
        if (Math.random() < 0.5) {
          pt_color = color(100, 5);
          ln_color = color(255, 5);
        } else {
          pt_color = color(0, 20);
          ln_color = color(0, 20);
        }

        n_vertices = Math.floor((Math.random() * 4) + 1);
        vertices = selectRandomVertices(n_vertices);
        
        drawGridGraph(vertices);
        
        pop();
      } 
    }
  } else if (draw_mode == "single") {  
    // the simple one
    background(0);
    frameRate(2);
    pt_color = color(100)
    ln_color = color(200)
    
    n_vertices = Math.floor((Math.random() * 4) + 1);
    vertices = selectRandomVertices(n_vertices);
    drawGridGraph(vertices);
  } else if (draw_mode == "grid") {
    background(0);
    frameRate(2);
    pt_color = color(100)
    ln_color = color(200)
        
    var vertices = [];
    var n_vertices = 0;  
    
    for (var i = 0; i < n_col; i++) {
      for (var j = 0; j < n_row; j++) {
        push();
        
        translate(spacing * i, spacing * j);
  
        n_vertices = Math.floor((Math.random() * 4) + 1);
        vertices = selectRandomVertices(n_vertices);
        
        drawGridGraph(vertices);
        
        pop();
      } 
    }
  }
  
}






function drawGridGraph(vertex_nos) {
  drawGraph(vertex_nos);
  drawGrid();
  
}

function drawGrid() {
  stroke(pt_color);
  strokeWeight(pt_size);
  
  for (var i = 1; i <= 4; i++) {
    point(pointCoords(i)[0], pointCoords(i)[1]);
  }

}

function drawGraph(vertex_nos) {
  stroke(ln_color);
  strokeWeight(ln_size);

  var n_vertices = vertex_nos.length;
  
  var vertex_1 = 0;
  var vertex_2 = 0;
  
  for (var i = 0; i < (n_vertices - 1); i++) {
    vertex_1 = vertex_nos[i];
    vertex_2 = vertex_nos[i+1];
    
    line(pointCoords(vertex_1)[0], pointCoords(vertex_1)[1], pointCoords(vertex_2)[0], pointCoords(vertex_2)[1]);  
  }
}

function pointCoords(vertex_no) {
  if (vertex_no == 1) {
    return([0, 0]);
  }
  
  if (vertex_no == 2) {
    return([spacing, 0]);
  }
  
  if (vertex_no == 3) {
    return([0, spacing]);
  }
  
  if (vertex_no == 4) {
    return([spacing, spacing]);
  }
}


function selectRandomVertices(n_vertices) {
  var vertices = [1, 2, 3, 4];
  var vertices_rand = [];
  
  for (var i = 0; i < 3; i++) {
    idx = Math.floor((Math.random()*(4-i)));
    vertices_rand.push(vertices.splice(idx, 1));
  }
  vertices_rand.push(vertices[0]);
  
  return(vertices_rand.slice(0, n_vertices));
}

