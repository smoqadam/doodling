'use client';

import P5Canvas, { P5Sketch } from '@/components/P5Canvas';

const rotatingPlaneSketch: P5Sketch = (p) => {
  p.setup = () => {
    console.log('✅ Sketch setup called');
    p.createCanvas(600, 400, p.WEBGL);
  };

  p.draw = () => {
    p.background(250);
    p.normalMaterial();
    p.rotateX(p.frameCount * 0.01);
    p.rotateY(p.frameCount * 0.01);
    p.plane(100);
  };
};

export default function RotatingPlane() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <P5Canvas sketch={rotatingPlaneSketch} />
    </div>
  );
}
