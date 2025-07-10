'use client';

import { useState } from 'react';
import P5Canvas, { P5Sketch } from '@/components/P5Canvas';

const createRotatingPlaneSketch = (rotationSpeed: number): P5Sketch => (p) => {
  p.setup = () => {
    p.createCanvas(600, 400, p.WEBGL);
  };

  p.draw = () => {
    p.background(250);
    p.normalMaterial();
    p.rotateX(p.frameCount * rotationSpeed);
    p.rotateY(p.frameCount * rotationSpeed);
    p.plane(100);
  };
};

export default function RotatingPlane() {
  const [rotationSpeed, setRotationSpeed] = useState(0.01);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotationSpeed(parseFloat(e.target.value));
  };

  const rotatingPlaneSketch = createRotatingPlaneSketch(rotationSpeed);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ margin: '20px 0', width: '80%', maxWidth: '600px' }}>
        <label htmlFor="speed-slider" style={{ display: 'block', marginBottom: '8px' }}>
          Rotation Speed: {rotationSpeed.toFixed(3)}
        </label>
        <input
          id="speed-slider"
          type="range"
          min="0"
          max="0.05"
          step="0.001"
          value={rotationSpeed}
          onChange={handleSpeedChange}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ flex: 1, width: '100%' }}>
        <P5Canvas sketch={rotatingPlaneSketch} />
      </div>
    </div>
  );
}
