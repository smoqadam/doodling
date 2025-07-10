'use client';

import P5Canvas from '@/components/P5Canvas';
import p5 from 'p5';
import { useState } from 'react';

export default function RotatingPlanePage() {
    
      const [rotationSpeed, setRotationSpeed] = useState(0.01);
    
      const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRotationSpeed(parseFloat(e.target.value));
      };
    
      const setup = (p: p5) => {
        p.createCanvas(600, 400, p.WEBGL);
      };
    
      const draw = (p: p5) => {
        p.background(250);
        p.normalMaterial();
        p.rotateX(p.frameCount * rotationSpeed);
        p.rotateY(p.frameCount * rotationSpeed);
        p.plane(100);
      };
    
      return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <div style={{ flex: 1, width: '100%', maxWidth: '600px', height: '400px' }}>
            <P5Canvas setup={setup} draw={draw} />
          </div>
        </div>
      );
}
