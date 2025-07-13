'use client';

import P5Canvas from '@/components/P5Canvas';
import p5 from 'p5';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { setupGame, update } from './game';


export default function MoreCirclesPage() {

  const setup = (p: any) => {
    const container = document.getElementById('p5-container');
    if (container) container.innerHTML = '';
    setupGame(p);
  };


  const draw = (p: p5) => {
    update(p);
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
        <h2 style={{ marginTop: 0, marginBottom: '15px' }}>Game Controls</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Movement</h3>
            <p style={{ margin: '5px 0' }}>↑ / W - Move Up</p>
            <p style={{ margin: '5px 0' }}>↓ / S - Move Down</p>
            <p style={{ margin: '5px 0' }}>← / A - Move Left</p>
            <p style={{ margin: '5px 0' }}>→ / D - Move Right</p>
          </div>
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Combat</h3>
            <p style={{ margin: '5px 0' }}>Mouse - Aim</p>
            <p style={{ margin: '5px 0' }}>Click - Shoot</p>
          </div>
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Objective</h3>
            <p style={{ margin: '5px 0' }}>Destroy enemies to gain points</p>
            <p style={{ margin: '5px 0' }}>Avoid taking damage</p>
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
