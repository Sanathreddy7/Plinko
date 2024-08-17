import {Obstacle, Sink} from "./objects";
import {ballRadius,gravity,horizontalFriction,verticalFriction} from "../constants";

export class Ball{
    radius: number;
    color: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    gravity: number;
    hFriction: number;
    vFriction: number;
    canvasContext: CanvasRenderingContext2D;
    obstacles: Obstacle[];
    sinks: Sink[];
    onFinish: (index: number) => void;
    getMultiplier: (_score: number) => void;


    constructor(x: number,y: number,canvasContext: CanvasRenderingContext2D, obstacles: Obstacle[], sinks: Sink[], onFinish: (index: number) => void, getMultiplier: (_score: number) => void){
        this.radius = ballRadius;
        this.color = "red";
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.gravity = gravity;
        this.hFriction = horizontalFriction;
        this.vFriction = verticalFriction;
        this.canvasContext = canvasContext;
        this.obstacles = obstacles;
        this.sinks = sinks;
        this.onFinish = onFinish;
        this.getMultiplier = getMultiplier;
      }

    draw(){
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }

    update() {
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
    
        // Collision with obstacles
        this.obstacles.forEach(obstacle => {
          const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
          if (dist < this.radius + obstacle.radius) {
            // Calculate collision angle
            const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
            // Reflect velocity
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            this.vx = (Math.cos(angle) * speed * horizontalFriction);
            this.vy = Math.sin(angle) * speed * verticalFriction;
    
            // Adjust position to prevent sticking
            const overlap = this.radius + obstacle.radius - dist;
            this.x += Math.cos(angle) * overlap;
            this.y += Math.sin(angle) * overlap;
          }
        });
    
        // Collision with sinks
        for (let i = 0; i < this.sinks.length; i++) {
          const sink = this.sinks[i];
          if (
              this.x > sink.x - sink.width / 2 &&
              this.x < sink.x + sink.width / 2 &&
              (this.y + this.radius) > (sink.y - sink.height / 2)
          ) {
              this.vx = 0;
              this.vy = 0;
              this.getMultiplier(sink.multiplier || 1);
              this.onFinish(i);

              break;
          }
        }
      }
}