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
    if (!canvasRef.current || typeof window === 'undefined') return;

    const loadP5 = async () => {
      try {
        const p5Module = await import('p5');
        const p5 = p5Module.default;
        
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
      } catch (error) {
        console.error('Failed to load p5.js:', error);
        return () => {};
      }
    };

    let cleanup: (() => void) | undefined;
    
    loadP5().then((cleanupFn) => {
      cleanup = cleanupFn;
    }).catch((error) => {
      console.error('Error in loadP5:', error);
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
