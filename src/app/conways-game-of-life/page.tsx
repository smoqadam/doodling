'use client';

import P5Canvas from '@/components/P5Canvas';
import p5 from 'p5';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Cell {
  x: number,
  y: number,
  alive: boolean,
}
export default function DrawSvgPage() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(2);
  // const [points, setPoints] = useState<Point[]>([]);


  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(e.target.value));
  };

  const handleSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value));
  };


  let rows = 200;
  let cols = 150;
  let grid: number[][] = [[]];
  let nextGrid: number[][] = [[]];
  let gen = 0;

  const setup = (p: any) => {
    const container = document.getElementById('p5-container');

    if (container) {
      container.innerHTML = '';
    }

    const width = container?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth - 20 : 800);
    const height = container?.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 600);
    const canvas = p.createCanvas(width, height);
    canvas.parent('p5-container');
    initGrid();
  };



  let t= 0;
  const draw = (p: p5) => {
    p.background(0, 0, 0);
    // p.noStroke();
    // p.fill(200);
    let hue1 = (t * 50 + gen);
    p.stroke(hue1, 200, 100);
    drawGrid(p);

    computeNextGen();
    gen++;
    t += 0.01;
  };

  function initGrid() {
    grid = [];
    nextGrid = [];
    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      nextGrid[y] = [];
      for (let x = 0; x < cols; x++) {
        grid[y][x] = Math.random() < 0.1 ? 1 : 0;
        nextGrid[y][x] = 0;
      }
    }
  }


  const drawGrid = (p: p5) => {
    const cellSize = 5;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        let px = x * cellSize;
        let py = y * cellSize;

        if (grid[x][y]) {

          // const pulse = cellSize + Math.sin(t * 2 + x * 0.2) * (cellSize * 0.3);
          // p.noFill();
          const hue = (cellSize + t * 50 + y * 10) % gen * 20;
          p.stroke(hue, 200, Math.sin(gen) * 20);
          // p.noStroke();
          // p.fill(hue, 40, 250);

          // p.circle(px, py, pulse);
          p.rect(px, py, cellSize, cellSize);
        }
        // else {
        //   p.noFill();
        //   // p.circle(px, py, 4);
        //   p.rect(px, py, cellSize, cellSize);
        // }
      }
    }
  }

  function computeNextGen() {
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
        let neighbors = 0;

        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            neighbors += grid[y + j][x + i];
          }
        }

        neighbors -= grid[y][x];


        if (grid[y][x] === 1 && (neighbors < 2 || neighbors > 3)) {
          nextGrid[y][x] = 0; // dies
        } else if (grid[y][x] === 0 && neighbors === 3) {
          nextGrid[y][x] = 1; // born
        } else {
          nextGrid[y][x] = grid[y][x]; // stays the same
        }
      }
    }

    [grid, nextGrid] = [nextGrid, grid];
  }





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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <label htmlFor="size-slider" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Size: {size}
            </label>
            <input
              id="size-slider"
              type="range"
              min="2"
              max="50"
              step="1"
              value={size}
              onChange={handleSize}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label htmlFor="color-slider" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Animation speed
            </label>
            <input
              id="color-slider"
              type="range"
              min="1"
              max="500"
              step="2"
              value={speed}
              onChange={handleSpeed}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      <div id="p5-container" style={{
        // flex: 1,
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: '0',
        // width: '100%',
        // height: '100%',
        // backgroundColor: '#000'
      }}>
        <P5Canvas setup={setup} draw={draw} />
      </div>
    </div>
  );
}
