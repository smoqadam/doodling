'use client';

import P5Canvas from '@/components/P5Canvas';
import p5 from 'p5';
import { useState } from 'react';
import Link from 'next/link';

export default function RotatingPlanePage() {
    
      const [rotationSpeed, setRotationSpeed] = useState(0.01);
    
      const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRotationSpeed(parseFloat(e.target.value));
      };
    
      const setup = (p: p5) => {
        const container = document.getElementById('p5-container');
        
        // Clear any existing canvases
        if (container) {
          container.innerHTML = '';
        }
        
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
          <Link href="/" style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            color: '#000', 
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            ← Back to Home
          </Link>
          
          <a 
            href="https://github.com/smoqadam/genart/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px', 
              color: '#000', 
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            GitHub →
          </a>
          
          <div style={{ 
            margin: '20px 0', 
            width: window.innerWidth > 768 ? '80%' : '90%', 
            maxWidth: '600px',
            padding: window.innerWidth > 768 ? '20px' : '15px'
          }}>
            <label htmlFor="speed-slider" style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: window.innerWidth > 768 ? '16px' : '14px'
            }}>
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
          <div id="p5-container" style={{ 
            flex: 1, 
            width: '100%', 
            maxWidth: window.innerWidth > 768 ? '600px' : '100%', 
            height: window.innerWidth > 768 ? '400px' : '300px',
            padding: window.innerWidth > 768 ? '0' : '10px'
          }}>
            <P5Canvas setup={setup} draw={draw} />
          </div>
        </div>
      );
}
