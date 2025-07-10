'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface P5CanvasProps {
  setup?: (p: p5) => void;
  draw?: (p: p5) => void;
  style?: React.CSSProperties;
}

export default function P5Canvas({ setup, draw, style }: P5CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const p5Instance = new p5((p) => {
      p.setup = () => {
        p.createCanvas(600, 400);
        if (setup) setup(p);
      };

      p.draw = () => {
        if (draw) draw(p);
      };
    }, canvasRef.current);

    return () => {
      p5Instance.remove();
    };
  }, [setup, draw]);

  return (
    <div 
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        ...style
      }}
    />
  );
}
