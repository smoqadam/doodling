'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: isMobile ? '20px' : '0'
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
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
        }}
      >
        GitHub →
      </a>
      
      <h1 style={{ 
        fontSize: isMobile ? '1.5rem' : '2rem', 
        fontWeight: 'bold',
        textAlign: 'center'
      }}>Doodling with code</h1>
      <Link 
        href="/modular-multiplication" 
      >
        Modular multiplication
      </Link>

      <Link 
        href="/circle" 
      >
        Circle
      </Link>


      {/* <Link 
        href="/draw-svg" 
      >
        draw svg
      </Link> */}
    </div>
  );
}
