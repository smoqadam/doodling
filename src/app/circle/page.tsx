'use client';

import P5Canvas from '@/components/P5Canvas';
import p5 from 'p5';
import { useState } from 'react';

export default function CirclePage() {

  const [steps, setSteps] = useState(0.1);
  const [color, setColor] = useState(255);
  const [fade, setFade] = useState(false);

  const handleSteps = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(parseFloat(e.target.value));
  };

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(parseInt(e.target.value));
  };

  const handleFade = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFade(e.target.checked);
  };

  const setup = (p: any) => {
    const container = document.getElementById('p5-container');
    const width = container?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth - 300 : 800);
    const height = container?.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 600);
    const canvas = p.createCanvas(width, height, p.WEBGL);
    canvas.parent('p5-container');
    // p.colorMode(p.HSB, 10);
  };

  let angle = 0;
  const draw = (p: p5) => {
    // p.translate(0, 0);
    // p.resetMatrix();
// 
    // p.fill(0, 0, 2);  // low alpha = slow fade
    p.fill(0, 0, 0, 30); // RGBA: A=alpha = 0 (transparent) to 255 (opaque)
    p.noStroke();
    if (fade)
      p.rect(-500, -300, p.width, p.height);
    // p.background(255);
    const angleFuncs = [
      (a: number) => a,
      (a: number) => -a * Math.log(a),
      (a: number) => a + Math.sin(a) / a,
      (a: number) => Math.sin(a * 3) * 10 + a,
      (a: number) => a * Math.sin(a * 2),
      (a: number) => Math.tan(a * 0.1),
      (a: number) => a * a * 0.001,
      (a: number) => a + p.random(-0.5, 0.5)
    ];

    for (let i = 0; i < angleFuncs.length; i++) {

      const func = angleFuncs[i];
      let r = 100 + 100 * Math.sin(angle * 0.1 + i);
      

      // 1
      let hue = (angle * 50 + i * 20) % 360;
      p.stroke(hue, 80, 100); // HSB: hue, saturation, brightness



      // p.stroke((i * 30) % 255, 255, 255);
      // p.stroke(angle * 30 % 255, angle * 30 % 255, angle * 30 % 255);
      // p.stroke(i * 30 % 255, 200, 255);
      // p.stroke((angle * 50) % 255, 255, 255);
      // p.stroke((angle * 50 + i * 20) % color, color, color);
//       let hue = (angle * 50 + i * 20) % 360;
// p.stroke(hue, 80, 100); // HSB: hue, saturation, brightness

// let hue = (Math.sin(angle + i) * 180 + 180) % 360;
// p.stroke(hue, 100, 100);

// let hue = (angle * 40 + i * 13) % 360;
// let sat = 80 + 20 * Math.sin(i + angle);
// let bri = 90 + 10 * Math.cos(i * 2 + angle);
// // p.stroke(hue, sat, bri);


// p.stroke(hue, sat, bri, 50); // 0–100 range for alpha in HSB
      drawLine(p, 0, 0, func(angle), r);
    }

    angle += 0.01
  };


  const drawLine = (p: p5, px: number, py: number, angle: number, r: number) => {
    // let px = 0;
    // let py = 0;
    let x, y;
    for (let i = 0; i < p.TWO_PI; i += steps) {
      // x = py + p.sin(angle + i) * r;
      // y = px + p.cos(angle +i ) * r;

      x = px + Math.cos(i + angle) * r;
      y = py + Math.sin(i + angle) * r;
      p.circle(x, y, 3);
      p.line(px, py, x, y); 
    }
  }




  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ margin: '20px 0', width: '80%', maxWidth: '600px' }}>
        <label htmlFor="speed-slider" style={{ display: 'block', marginBottom: '8px' }}>
          Rotation Speed: {steps.toFixed(3)}
        </label>
        <input
          id="speed-slider"
          type="range"
          min="0.01"
          max="0.5"
          step="0.01"
          value={steps}
          onChange={handleSteps}
          style={{ width: '100%' }}
        />
        <label htmlFor="color-slider" style={{ display: 'block', marginBottom: '8px', marginTop: '16px' }}>
          Color: {color}
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
        <label htmlFor="fade-checkbox" style={{ display: 'block', marginTop: '16px' }}>
          <input
            id="fade-checkbox"
            type="checkbox"
            checked={fade}
            onChange={handleFade}
            style={{ marginRight: '8px' }}
          />
          Fade
        </label>
      </div>
      <div id="p5-container" style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        width: '100%',
        height: '100%'
      }}>
        <P5Canvas setup={setup} draw={draw} />
      </div>
    </div>
  );
}
