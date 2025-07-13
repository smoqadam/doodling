import p5 from 'p5';

let width: number, height: number;
let maxEnemies = 3;
let r: number = 0;

const player = {
  x: 200,
  y: 700,
  size: 50,
  headX: 0,
  headY: 0,
  hp: 100,
  score: 0,
};

const bullets: {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  currX: number,
  currY: number,
  t: number,
  angleVel: number,
  angle: number,
  speed: number,
}[] = [];

const enemies: {
  x: number,
  y: number,
  currX: number,
  currY: number,
  fill: [number,number,number],
  t: number,
  speed: number,
}[] = [];

export const setupGame = (p: any) => {
  const container = document.getElementById('p5-container');
  if (container) container.innerHTML = '';
  width = container?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth - 20 : 800);
  height = container?.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 600);
  const canvas = p.createCanvas(width, height);
  canvas.parent('p5-container');
  player.x = width / 2;
  player.y = height / 2;
  addEnemy(p);
};

export const update = (p: p5) => {
  handleInput(p);
  if (player.hp <= 0) {
    drawGameover(p);
    return;
  }

  drawPlayer(p);
  shoot(p);
  spawnEnemies(p);
  checkCollisions(p);
  drawStats(p);

}
export const shoot = (p: p5) => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const s = bullets[i];
    const distance = 500;
    const targetX = s.x1 + p.cos(s.angle) * distance;
    const targetY = s.y1 + p.sin(s.angle) * distance;
    s.currX = p.lerp(s.x1, targetX, s.t);
    s.currY = p.lerp(s.y1, targetY, s.t);
    p.fill(255);
    p.circle(s.currX, s.currY, 3);
    s.t += 0.05;
    const outOfBounds = s.currX < 0 || s.currX > p.width || s.currY < 0 || s.currY > p.height;
    if (s.t >= 1 || outOfBounds) bullets.splice(i, 1);
  }
};

export const checkCollisions = (p: p5) => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const s = bullets[i];
    for (let j = enemies.length - 1; j >= 0; j--) {
      const e = enemies[j];
      const dx = s.currX - e.currX;
      const dy = s.currY - e.currY;
      const dist = Math.hypot(dx, dy);
      if (dist < 20) {
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        player.score += 4;
        break;
      }
    }
  }
};

export const addEnemy = (p: p5) => {
  if (enemies.length >= maxEnemies) return;
  let remainings = maxEnemies - enemies.length;
  for (let i = 0; i < remainings; i++) {
    let edge = p.floor(p.random(4));
    let x, y;
    switch (edge) {
      case 0: x = p.random(0, p.width); y = 0; break;
      case 1: x = p.width; y = p.random(0, p.height); break;
      case 2: x = p.random(0, p.width); y = p.height; break;
      case 3: x = 0; y = p.random(0, p.height); break;
      default: x = 0; y = 0; break;
    }
    enemies.push({
      x,
      y,
      currX: x,
      currY: y,
      fill: [p.random(255), p.random(255), p.random(255)],
      t: 0,
      speed: p.random(1, 5)
    });
  }
};

export const spawnEnemies = (p: p5) => {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    const dx = player.x - e.currX;
    const dy = player.y - e.currY;
    const angle = Math.atan2(dy, dx);
    e.currX += Math.cos(angle) * e.speed;
    e.currY += Math.sin(angle) * e.speed;
    p.fill(e.fill[0], e.fill[1], e.fill[2 ]);
    p.noStroke();
    p.rect(e.currX, e.currY, 20, 20);
    const dist = Math.hypot(dx, dy);
    if (dist < 30) {
      enemies.splice(i, 1);
      player.hp -= 5;
    }
  }
  addEnemy(p);
};

export const drawPlayer = (p: p5) => {
  p.background(0, 0, 0);
  p.fill(200);
  p.stroke(255);


  if (player.x > width) {
    player.x = 0;
  }

  if (player.y > height) {
    player.y = 0;
  }

  if (player.x < 0) {
    player.x = width;
  }

  if (player.y < 0) {
    player.y = height;
  }

  r = Math.atan2(p.mouseY - player.y, p.mouseX - player.x);

  const x2 = player.x + p.cos(r) * player.size;
  const y2 = player.y + p.sin(r) * player.size;
  player.headX = x2;
  player.headY = y2;
  p.line(player.x, player.y, x2, y2);
  p.circle(player.x, player.y, 30);
  p.circle(x2, y2, 10);


};

export const handleInput = (p: p5) => {
  console.log('aa', p.keyIsDown(p.LEFT_ARROW));
  if (p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(65)) {
    player.x -= 5;
  }
  if (p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(68)) {
    player.x += 5;
  }
  if (p.keyIsDown(p.UP_ARROW) || p.keyIsDown(87)) {
    player.y -= 5;
  }
  if (p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown(83)) {
    player.y += 5;
  }
  if (player.hp <= 0 && p.keyIsDown(p.ENTER)) {
    player.hp = 100;
  }
  if (p.mouseIsPressed) {
    if (bullets.length >= 5) return;
    bullets.push({
      x1: player.x,
      y1: player.y,
      currX: player.x,
      currY: player.y,
      x2: player.headX,
      y2: player.headY,
      t: 0,
      angle: r,
      angleVel: 0,
      speed: 5
    });
  }
};


export const drawStats = (p: p5) => {
  p.textSize(20);
  p.fill(255);
  p.text("HP: " + player.hp, 10, 20);
  p.text("Score: " + player.score, 10, 50);
}


export const drawGameover = (p: p5) => {
  p.noStroke();
  p.fill(0, 0, 0, 23);
  p.rect(0, 0, width, height);
  p.fill(255, 0, 0);
  p.textSize(50);
  p.text("Game Over", width / 2 - 150, height / 2 - 100);

  p.fill(255);
  p.textSize(20);
  p.text("Score: " + player.score, width / 2 - 150, height / 2 - 40);
  p.text("Press Enter to retry", width / 2 - 150, height / 2 + 40);

}