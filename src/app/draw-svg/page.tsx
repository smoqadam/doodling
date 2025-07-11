'use client';

import P5Canvas from '@/components/P5Canvas';
import p5 from 'p5';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Point {
  x: number,
  y: number,
}
export default function DrawSvgPage() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(2);
  const [svgString, setSvgString] = useState(`<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="cls-1" d="M40.5,5.5H7.5a2,2,0,0,0-2,2v33a2,2,0,0,0,2,2h33a2,2,0,0,0,2-2V7.5A2,2,0,0,0,40.5,5.5Z"/><path class="cls-1" d="M15,37.5v-27h4.57A13.48,13.48,0,0,1,33,24h0A13.48,13.48,0,0,1,19.55,37.5Z"/></svg>`);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const load = async () => {
      const { svg2path } = await import('./utils');
      setPoints(svg2path(svgString));
    };
    load();
  }, [svgString]);

  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(e.target.value));
  };

  const handleSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value));
  };

  const handleSvgString = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSvgString(e.target.value);
  };


  const setup = (p: any) => {
    const container = document.getElementById('p5-container');

    if (container) {
      container.innerHTML = '';
    }

    const width = container?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth - 300 : 800);
    const height = container?.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 600);
    const canvas = p.createCanvas(width, height);
    canvas.parent('p5-container');
    p.colorMode(p.HSB, 360, 100, 100);
  };

  console.log('Total points:', points.length);
  console.log(points);

  let x1 = 50;
  let y1 = 50;
  let x2 = 500;
  let y2 = 50;
  let my = 500;

  let t = 0;

  let rows = 100;

  const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    if (inMax - inMin === 0) return outMin; // or outMax, or a neutral default
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  };

  // Find min/max from your raw points
  const xVals = points.map(p => p.x);
  const yVals = points.map(p => p.y);

  const minX = Math.min(...xVals);
  const maxX = Math.max(...xVals);
  const minY = Math.min(...yVals);
  const maxY = Math.max(...yVals);
  console.log({ minY, maxY, minX, maxX });
  // Create scaled copy of points
  let scaledPoints = points.map(p => ({
    x: map(p.x, minX, maxX, x1, x2),
    y: map(p.y, minY, maxY, y1, my),
  }));

  console.log({ scaledPoints });
  let visibleCount = 0;
  const revealSpeed = 20;
  
  // scaledPoints = scaledPoints.map(value => ({ value, sort: Math.random() }))
  // .sort((a, b) => a.sort - b.sort)
  // .map(({ value }) => value);
  const draw = (p: p5) => {
    p.background(0, 0, 0, 1000);
    p.rotate(0);
    for (let i = 0; i < visibleCount && i < scaledPoints.length; i++) {
      const point = scaledPoints[i];

      const pulse = size + Math.sin(t * 2 + i * 0.2) * (size * 0.3);

      
      const hue = (pulse + t * 50 + i * 10) % 360;
  
      p.noFill();
      p.stroke(hue, 40, 250);
      p.circle(point.x, point.y, pulse);
    }
  
    if (p.frameCount % 5 === 0) {
      t += 0.1;
      visibleCount += speed;
    }
  };
  

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
        width: '90%',
        maxWidth: '1000px',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        color: '#fff'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <label htmlFor="svg-input" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              SVG String:
            </label>
            <textarea
              id="svg-input"
              value={svgString}
              onChange={handleSvgString}
              placeholder="Enter SVG path string (e.g., M10,10 L100,10 L100,100 L10,100 Z)"
              style={{
                width: '100%',
                height: '80px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#2a2a2a',
                color: '#fff',
                fontSize: '12px',
                fontFamily: 'monospace',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label htmlFor="size-slider" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Size: {size}
            </label>
            <input
              id="size-slider"
              type="range"
              min="2"
              max="50"
              step="1"
              value={size}
              onChange={handleSize}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label htmlFor="color-slider" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Animation speed
            </label>
            <input
              id="color-slider"
              type="range"
              min="1"
              max="500"
              step="2"
              value={speed}
              onChange={handleSpeed}
              style={{ width: '100%' }}
            />
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
