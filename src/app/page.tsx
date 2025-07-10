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
          
        }}
      >
        GitHub →
      </a>
      
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Doodling with code</h1>
      {/* <Link 
        href="/rotating-plane" 
        
      >
        Example page
      </Link> */}
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
