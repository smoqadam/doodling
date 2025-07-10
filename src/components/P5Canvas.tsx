'use client';

import { useEffect, useRef } from 'react';

interface P5CanvasProps {
  setup?: (p: any) => void;
  draw?: (p: any) => void;
  style?: React.CSSProperties;
}

export default function P5Canvas({ setup, draw, style }: P5CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const loadP5 = async () => {
      const p5 = (await import('p5')).default;
      
      const p5Instance = new p5((p) => {
        p.setup = () => {
          if (setup) setup(p);
        };

        p.draw = () => {
          if (draw) draw(p);
        };
      }, canvasRef.current!);

      return () => {
        p5Instance.remove();
      };
    };

    let cleanup: (() => void) | undefined;
    
    loadP5().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) cleanup();
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
