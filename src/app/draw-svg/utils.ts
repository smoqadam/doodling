
'use client';

export function svg2path(svgString: string, stepSize: number = 1) {
  // Parse SVG string and append it to DOM (hidden)
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  
  if (!svg) {
    throw new Error('Invalid SVG string');
  }
  
  svg.style.position = 'absolute';
  svg.style.left = '-9999px'; // hide
  document.body.appendChild(svg);
  
  const allPoints: { x: number; y: number; }[] = [];
  
  try {
    // Get all elements that can be converted to points
    const elements = svg.querySelectorAll('path, circle, ellipse, rect, line, polyline, polygon');
    
    elements.forEach((element) => {
      const points = convertElementToPoints(element, stepSize);
      allPoints.push(...points);
    });
    
    return allPoints;
  } finally {
    // Clean up - remove the SVG from DOM
    document.body.removeChild(svg);
  }
}

function convertElementToPoints(element: Element, stepSize: number): Array<{x: number, y: number}> {
  const points = [];
  const tagName = element.tagName.toLowerCase();
  
  switch (tagName) {
    case 'path':
      return getPathPoints(element as SVGPathElement, stepSize);
      
    case 'circle':
      return getCirclePoints(element as SVGCircleElement, stepSize);
      
    case 'ellipse':
      return getEllipsePoints(element as SVGEllipseElement, stepSize);
      
    case 'rect':
      return getRectPoints(element as SVGRectElement, stepSize);
      
    case 'line':
      return getLinePoints(element as SVGLineElement, stepSize);
      
    case 'polyline':
    case 'polygon':
      return getPolyPoints(element as SVGPolylineElement | SVGPolygonElement);
      
    default:
      return [];
  }
}

function getPathPoints(pathElement: SVGPathElement, stepSize: number): Array<{x: number, y: number}> {
  const length = pathElement.getTotalLength();
  const points = [];
  
  for (let i = 0; i <= length; i += stepSize) {
    const pt = pathElement.getPointAtLength(i);
    points.push({ x: pt.x, y: pt.y });
  }
  
  return points;
}

function getCirclePoints(circleElement: SVGCircleElement, stepSize: number): Array<{x: number, y: number}> {
  const cx = parseFloat(circleElement.getAttribute('cx') || '0');
  const cy = parseFloat(circleElement.getAttribute('cy') || '0');
  const r = parseFloat(circleElement.getAttribute('r') || '0');
  
  const points = [];
  const circumference = 2 * Math.PI * r;
  const angleStep = (stepSize / circumference) * 2 * Math.PI;
  
  for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
    points.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    });
  }
  
  return points;
}

function getEllipsePoints(ellipseElement: SVGEllipseElement, stepSize: number): Array<{x: number, y: number}> {
  const cx = parseFloat(ellipseElement.getAttribute('cx') || '0');
  const cy = parseFloat(ellipseElement.getAttribute('cy') || '0');
  const rx = parseFloat(ellipseElement.getAttribute('rx') || '0');
  const ry = parseFloat(ellipseElement.getAttribute('ry') || '0');
  
  const points = [];
  // Approximate circumference for ellipse
  const circumference = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  const angleStep = (stepSize / circumference) * 2 * Math.PI;
  
  for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
    points.push({
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle)
    });
  }
  
  return points;
}

function getRectPoints(rectElement: SVGRectElement, stepSize: number): Array<{x: number, y: number}> {
  const x = parseFloat(rectElement.getAttribute('x') || '0');
  const y = parseFloat(rectElement.getAttribute('y') || '0');
  const width = parseFloat(rectElement.getAttribute('width') || '0');
  const height = parseFloat(rectElement.getAttribute('height') || '0');
  
  const points = [];
  
  // Top edge
  for (let i = 0; i <= width; i += stepSize) {
    points.push({ x: x + i, y });
  }
  
  // Right edge
  for (let i = stepSize; i <= height; i += stepSize) {
    points.push({ x: x + width, y: y + i });
  }
  
  // Bottom edge (right to left)
  for (let i = width - stepSize; i >= 0; i -= stepSize) {
    points.push({ x: x + i, y: y + height });
  }
  
  // Left edge (bottom to top)
  for (let i = height - stepSize; i > 0; i -= stepSize) {
    points.push({ x, y: y + i });
  }
  
  return points;
}

function getLinePoints(lineElement: SVGLineElement, stepSize: number): Array<{x: number, y: number}> {
  const x1 = parseFloat(lineElement.getAttribute('x1') || '0');
  const y1 = parseFloat(lineElement.getAttribute('y1') || '0');
  const x2 = parseFloat(lineElement.getAttribute('x2') || '0');
  const y2 = parseFloat(lineElement.getAttribute('y2') || '0');
  
  const points = [];
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const steps = Math.ceil(length / stepSize);
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push({
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1)
    });
  }
  
  return points;
}

function getPolyPoints(polyElement: SVGPolylineElement | SVGPolygonElement): Array<{x: number, y: number}> {
  const pointsAttr = polyElement.getAttribute('points');
  if (!pointsAttr) return [];
  
  const points = [];
  const coords = pointsAttr.trim().split(/[\s,]+/);
  
  for (let i = 0; i < coords.length; i += 2) {
    if (i + 1 < coords.length) {
      points.push({
        x: parseFloat(coords[i]),
        y: parseFloat(coords[i + 1])
      });
    }
  }
  
  return points;
}

// Helper function to get points with density control
export function svg2pathWithDensity(svgString: string, density: 'low' | 'medium' | 'high' = 'medium') {
  const stepSizes = {
    low: 5,
    medium: 2,
    high: 0.5
  };
  
  return svg2path(svgString, stepSizes[density]);
}