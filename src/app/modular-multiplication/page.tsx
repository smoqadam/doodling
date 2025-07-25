'use client';

import P5Canvas from '@/components/P5Canvas';
import { useState, useEffect } from 'react';
import { drawShape } from './draw';
import { Shape } from './types';
import Link from 'next/link';

export default function ModularMultiplicationPage() {
  const [radius, setRadius] = useState(250);
  const [multiplier, setMultiplier] = useState(661);
  const [totalPoints, setTotalPoints] = useState(716);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [shapes, setShapes] = useState<Shape[]>([
    {
      name: 'Square',
      enabled: true,
      radius,
      color: '#ffffff',
      points: [],
      totalPoints,
      multiplier,
      rotate: false,
    },
    {
      name: 'Circle',
      enabled: true,
      radius,
      color: '#000000',
      points: [],
      totalPoints,
      multiplier,
      rotate: true,

    }
  ]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowControls(false); // Hide controls by default on mobile
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseFloat(e.target.value);
    setRadius(newRadius);
    setShapes(prev => prev.map(shape => ({ ...shape, radius: newRadius })));
  };

  const handleMultiplier = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMultplier = parseFloat(e.target.value);
    setMultiplier(newMultplier);
    setShapes(prev => prev.map(shape => ({ ...shape, multiplier: newMultplier })));
  };

  const handleTotalPoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotalPoints = parseInt(e.target.value);
    setTotalPoints(newTotalPoints);
    setShapes(prev => prev.map(shape => ({ ...shape, totalPoints: newTotalPoints })));
  };

  const toggleShape = (index: number) => {
    setShapes(prev => prev.map((shape, i) => 
      i === index ? { ...shape, enabled: !shape.enabled } : shape
    ));
  };

  const handleColorChange = (index: number, color: string) => {
    setShapes(prev => prev.map((shape, i) => 
      i === index ? { ...shape, color } : shape
    ));
  };

  const toggleRotation = (index: number) => {
    setShapes(prev => prev.map((shape, i) => 
      i === index ? { ...shape, rotate: !shape.rotate } : shape
    ));
  };

  const setup = (p: any) => {
    const container = document.getElementById('p5-container');
    
    // Clear any existing canvases
    if (container) {
      container.innerHTML = '';
    }
    
    const width = container?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth - (isMobile ? 0 : 300) : 800);
    const height = container?.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 600);
    const canvas = p.createCanvas(width, height, p.WEBGL);
    canvas.parent('p5-container');
  };

  const drawCanvas = (p: any) => {
    p.background(0);
    shapes.forEach(shape => {
      if (shape.enabled)
        drawShape(p, shape);
    });
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#000'
    }}>
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
          fontWeight: '600',
          zIndex: 1000
        }}
      >
        GitHub →
      </a>

      {/* Mobile Controls Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setShowControls(!showControls)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1001,
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </button>
      )}
      
      {/* Left Side - Controls */}
      {(!isMobile || showControls) && (
        <div style={{ 
          width: isMobile ? '100%' : '300px', 
          height: isMobile ? (showControls ? '50vh' : 'auto') : '100vh',
          padding: isMobile ? '60px 10px 10px 10px' : '20px', 
          backgroundColor: '#000',
          borderRight: isMobile ? 'none' : '1px solid #333',
          borderBottom: isMobile ? '1px solid #333' : 'none',
          overflowY: 'auto',
          position: isMobile ? 'relative' : 'static'
        }}>
          <Link href="/" style={{ 
            color: '#fff', 
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '20px',
            display: 'block'
          }}>
            ← Back to Home
          </Link>
          
          <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#fff' }}>Controls</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px', color: '#fff' }}>
              Radius: {radius}
            </label>
            <input
              type="range"
              min="100"
              max="5000"
              step="1"
              value={radius}
              onChange={handleRadius}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px', color: '#fff' }}>
              Multiplier: {multiplier}
            </label>
            <input
              type="range"
              min="10"
              max="2000"
              step="1"
              value={multiplier}
              onChange={handleMultiplier}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px', color: '#fff' }}>
              Total Points: {totalPoints}
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="1"
              value={totalPoints}
              onChange={handleTotalPoints}
              style={{ width: '100%' }}
            />
          </div>

          {/* Shapes */}
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '14px' : '16px', color: '#fff' }}>Shapes</h3>
            {shapes.map((shape, index) => (
              <div key={index} style={{ 
                marginBottom: '15px', 
                padding: isMobile ? '8px' : '10px', 
                border: '1px solid #333', 
                borderRadius: '5px' 
              }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px', color: '#fff' }}>
                  <input
                    type="checkbox"
                    checked={shape.enabled}
                    onChange={() => toggleShape(index)}
                    style={{ marginRight: '8px' }}
                  />
                  {shape.name}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <label style={{ fontSize: '14px', color: '#ccc' }}>Color:</label>
                  <input
                    type="color"
                    value={shape.color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    style={{ width: '40px', height: '30px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={shape.rotate}
                    onChange={() => toggleRotation(index)}
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#ccc' }}>Rotate</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div id="p5-container" style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '0',
        width: '100%',
        height: isMobile ? (showControls ? '50vh' : '100vh') : '100vh',
        minHeight: isMobile ? '300px' : 'auto'
      }}>
        <P5Canvas setup={setup} draw={drawCanvas} />
      </div>
    </div>
  );
}
