import {WIDTH,HEIGHT,obstacleRadius,NUM_SINKS,sinkWidth} from '../constants';
export interface Obstacle{
    x: number;
    y: number;
    radius: number;
}

export interface Sink {
    x: number;
    y: number;
    width: number;
    height: number;
    multiplier?: number;
}

export const MULTIPLIERS: {[key:number]:number} = {
    1: 16,
    2: 9,
    3: 2,
    4: 1.4,
    5: 1.4,
    6: 1.2,
    7: 1.1,
    8: 1,
    9: 0.5,
    10: 1,
    11: 1.1,
    12: 1.2,
    13: 1.4,
    14: 1.4,
    15: 2,
    16: 9,
    17: 16
};


export const createObstacles = (): Obstacle[] => {
    const obstacles: Obstacle[] = [];
    const rows = 18;

    for(let row=2 ; row<rows ; row++){
        const numObstacles = row+1;
        const spacing=36;
        const y = row*spacing;
        for(let col=0 ; col< numObstacles ;col++){
            const x = WIDTH/2 - spacing*(row/2 -  col);
            obstacles.push({x,y,radius:obstacleRadius});
        }
    }
    return obstacles;
}

export const createSinks = (): Sink[] => {
    const sinks: Sink[] = [];
    const SPACING = obstacleRadius * 2;

    for (let i = 0; i < NUM_SINKS; i++) {
      const x = WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS/2)) - SPACING * 1.5;
      const y = HEIGHT - 150;
      const width = sinkWidth;
      const height = width;
      sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i+1] });
    }

    return sinks;
}
