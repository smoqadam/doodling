'use client';

import P5Canvas from '@/components/P5Canvas';
import p5 from 'p5';
import { useState } from 'react';
import Link from 'next/link';

export default function CirclePage() {

  const [steps, setSteps] = useState(50);
  const [color, setColor] = useState(255);
  const [fade, setFade] = useState(true);
  const [colorType, setColorType] = useState('rainbow');

  const handleSteps = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(parseInt(e.target.value));
  };

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(parseInt(e.target.value));
  };

  const handleFade = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFade(e.target.checked);
  };

  const handleColorType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColorType(e.target.value);
  };

  const setup = (p: any) => {
    const container = document.getElementById('p5-container');
    
    // Clear any existing canvases
    if (container) {
      container.innerHTML = '';
    }
    
    const width = container?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth - 300 : 800);
    const height = container?.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 600);
    const canvas = p.createCanvas(width, height, p.WEBGL);
    canvas.parent('p5-container');

    // p.colorMode(p.HSB, color, color, color);
  };

  let angle = 0;
  const draw = (p: p5) => {
    p.fill(0, 0, 0, 30); // RGBA: A=alpha = 0 (transparent) to 255 (opaque)
    p.noStroke();
    if (fade)
      p.rect(-500, -300, p.width, p.height);
    const angleFuncs = [

      (a: number) => a * (Math.sin(a) + Math.cos(a)),
      (a: number) => Math.sin(a) * Math.sin(a * 0.5) * a,
      (a: number) => Math.sign(Math.sin(a * 3)) * a,
      (a: number) => Math.pow(Math.sin(a), 3) * a,
      (a: number) => Math.sin(a * a * 0.0001) * a,
      (a: number) => (Math.sin(a * 2) + Math.cos(a * 3)) * a,
      (a: number) => a * Math.sin(a) + Math.cos(a * 2),
      (a: number) => Math.sqrt(a) * Math.sin(a * 3),
      (a: number) => Math.exp(Math.sin(a)) - 1,
      (a: number) => Math.abs(Math.sin(a * 2)) * a,
      (a: number) => a * Math.sin(a * 0.3) * Math.cos(a * 0.5),
      (a: number) => Math.atan(a) * 10,
            (a: number) => a,
      (a: number) => -a * Math.log(a),
      (a: number) => a + Math.sin(a) / a,
      (a: number) => Math.sin(a * 3) * 10 + a,
      (a: number) => a * Math.sin(a * 2),
      (a: number) => Math.tan(a * 0.1),
      (a: number) => a * a * 0.001,
      (a: number) => a + p.random(-0.5, 0.5),

    ];

    for (let i = 0; i < angleFuncs.length; i++) {

      const func = angleFuncs[i];
      let r = 100 + 100 * Math.sin(angle * 0.1 + i);
      
      switch(colorType) {
        case 'rainbow':
          let hue1 = (angle * 50 + i * 20) % 360;
          p.stroke(hue1, 80, 100);
          break;
        case 'warm':
          let hue2 = (Math.sin(angle + i) * 180 + 180) % 360;
          p.stroke(hue2, 100, 100);
          break;
        case 'cool':
          let hue3 = (angle * 40 + i * 13) % 360;
          let sat3 = 80 + 20 * Math.sin(i + angle);
          let bri3 = 90 + 10 * Math.cos(i * 2 + angle);
          p.stroke(hue3, sat3, bri3);
          break;
        case 'monochrome':
          p.stroke((angle * 50 + i * 20) % color, color, color);
          break;
        case 'neon':
          p.stroke(i * 30 % 255, 200, 255);
          break;
        default:
          p.stroke((angle * 50 + i * 20) % 360, 80, 100);
      }

      drawLine(p, 0, 0, func(angle), r + steps);
    }

    angle += 0.01
  };


  const drawLine = (p: p5, px: number, py: number, angle: number, r: number) => {
    let x, y;
    for (let i = 0; i < p.TWO_PI; i += 0.5) {
      x = px + Math.cos(i + angle) * r;
      y = py + Math.sin(i + angle) * r;
      p.noFill()
        p.circle(x, y, 3);
      //   if (!!p.random(0,1))
      // p.line(px, py, x, y); 
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Link href="/" style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        color: '#fff', 
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
          color: '#fff', 
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: '600'
        }}
      >
        GitHub →
      </a>
      
      <div style={{ 
        margin: '20px 0', 
        width: '80%', 
        maxWidth: '800px',
        padding: '20px',
        backgroundColor: '#000000',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <label htmlFor="speed-slider" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Radius: {steps}
            </label>
            <input
              id="speed-slider"
              type="range"
              min="10"
              max="120"
              step="5"
              value={steps}
              onChange={handleSteps}
              style={{ width: '100%' }}
            />
            
            <label htmlFor="color-slider" style={{ display: 'block', marginBottom: '8px', marginTop: '16px', fontWeight: '600' }}>
              Color Intensity: {color}
            </label>
            <input
              id="color-slider"
              type="range"
              min="0"
              max="255"
              step="1"
              value={color}
              onChange={handleColor}
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <label htmlFor="color-type" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Color Type:
            </label>
            <select
              id="color-type"
              value={colorType}
              onChange={handleColorType}
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            >
              <option value="rainbow">Rainbow Hue</option>
              <option value="warm">Warm Sine Wave</option>
              <option value="cool">Cool Dynamic</option>
              <option value="monochrome">Monochrome</option>
              <option value="neon">Neon Blue</option>
            </select>
            
            <label htmlFor="fade-checkbox" style={{ display: 'flex', alignItems: 'center', marginTop: '16px', fontWeight: '600' }}>
              <input
                id="fade-checkbox"
                type="checkbox"
                checked={fade}
                onChange={handleFade}
                style={{ marginRight: '8px' }}
              />
              Enable Fade Effect
            </label>
          </div>
        </div>
      </div>
      
      <div id="p5-container" style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#000'
      }}>
        <P5Canvas setup={setup} draw={draw} />
      </div>
    </div>
  );
}
