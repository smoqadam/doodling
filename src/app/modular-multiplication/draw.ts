import p5 from 'p5';

export const drawShape = (p: p5, shape: Shape) => {
    p.stroke(shape.color);
    // p.fill(255, 255, 255);
    let points;
    if (shape.name === 'Square') {
      if (shape.rotate) 
        p.rotate(p.frameCount / 100) 
      else 
        p.rotate(0);

      points = generateSquarePoints(p, shape);
      shape.points = points;
      applyModularMultiplication(p, shape);
    }

    if (shape.name === 'Circle') {

      if (shape.rotate) 
        p.rotate(p.frameCount / 100) 
      else 
        p.rotate(0);
      points = generateCirclePoints(p, shape);
      shape.points = points;
      applyModularMultiplication(p, shape);
    }
    console.log('shape', JSON.stringify(shape));
}


function generateCirclePoints(p, shape) {
  let points = [];
  for (let i = 0; i < shape.totalPoints; i++) {
      let angle = p.TWO_PI * i / shape.totalPoints;
      let x = shape.radius * p.cos(angle);
      let y = shape.radius * p.sin(angle);
      points.push(p.createVector(x, y));
  }
  return points;
}


function generateSquarePoints(p, shape: Shape) {
  let vertices = [
      p.createVector(-shape.radius, -shape.radius),  // top-lefr
      p.createVector(shape.radius, -shape.radius),   // top-right
      p.createVector(shape.radius, shape.radius),    // bottom-right
      p.createVector(-shape.radius, shape.radius)    // bottom-left
  ];

  return extractPathPointsFromVertices(p, vertices, shape);
}

function extractPathPointsFromVertices(p, vertices, shape) {
  let points = [];
  let edges = [];
  let totalLength = 0;
  
  for (let i = 0; i < vertices.length; i++) {
      let a = vertices[i];
      let b = vertices[(i + 1) % vertices.length];
      let edgeLength = p.dist(a.x, a.y, b.x, b.y);
      edges.push({ a, b, len: edgeLength });
      totalLength += edgeLength;
  }
  
  for (let i = 0; i < shape.totalPoints; i++) {
      let distanceAlong = (i / shape.totalPoints) * totalLength;
      let accumulatedDist = 0;
      
      for (let edge of edges) {
          if (accumulatedDist + edge.len >= distanceAlong) {
              let t = (distanceAlong - accumulatedDist) / edge.len;
              let x = p.lerp(edge.a.x, edge.b.x, t);
              let y = p.lerp(edge.a.y, edge.b.y, t);
              points.push(p.createVector(x, y));
              break;
          }
          accumulatedDist += edge.len;
      }
  }
  
  return points;
}

function applyModularMultiplication(p, shape: Shape) {
  if (!shape.points || shape.points.length === 0) return;
  
  for (let i = 0; i < Math.min(shape.totalPoints, shape.points.length); i++) {
      let a = shape.points[i];
      let j = (i * shape.multiplier) % shape.points.length;
      let b = shape.points[j];
      
      if (a && b) {
          p.line(a.x, a.y, b.x, b.y);
      }
  }
}
