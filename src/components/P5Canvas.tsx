'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

export type P5Sketch = (p: p5) => void;

interface P5CanvasProps {
  sketch: P5Sketch;
  style?: React.CSSProperties;
}

export default function P5Canvas({ sketch, style }: P5CanvasProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let instance: p5;

    if (wrapperRef.current) {
      instance = new p5(sketch, wrapperRef.current);
    }

    return () => {
      if (instance) instance.remove();
    };
  }, [sketch]);

  return (
    <div ref={wrapperRef} style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    />
  );
}
