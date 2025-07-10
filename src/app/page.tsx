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
      gap: '20px',
      padding: window.innerWidth > 768 ? '0' : '20px'
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
          fontSize: window.innerWidth > 768 ? '16px' : '14px',
          fontWeight: '600',
        }}
      >
        GitHub →
      </a>
      
      <h1 style={{ 
        fontSize: window.innerWidth > 768 ? '2rem' : '1.5rem', 
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
    </div>
  );
}
