'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Generative Art Examples</h1>
      <Link 
        href="/rotating-plane" 
        
      >
        Rotating Plane Example
      </Link>
      <Link 
        href="/modular-multiplication" 
      >
        Modular multiplication
      </Link>
    </div>
  );
}
