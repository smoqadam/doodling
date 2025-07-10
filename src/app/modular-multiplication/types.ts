import { Vector } from "p5";

export interface Shape {
    name: string;
    enabled: boolean;
    radius: number,
    points: Vector[],
    totalPoints: number,
    multiplier: number,
    color: string,
    rotate: boolean,
  }
  