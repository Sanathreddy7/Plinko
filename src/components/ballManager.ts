import { HEIGHT, WIDTH, obstacleRadius, sinkWidth } from "../constants";
import { Obstacle, Sink, createObstacles, createSinks } from "./objects";
import { Ball } from "./ball";
import { get } from "http";


export class BallManager{
    balls: Ball[];
    canvasRef: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    obstacles: Obstacle[];
    sinks: Sink[];
    onFinish?: (index: number,startX?: number) => void;
    getMultiplier?: (_score: number) => void;
    requestId?: number;


    constructor(canvasRef: HTMLCanvasElement, onFinish?: (index: number,startX?: number) => void, getMultiplier?: (_score: number) => void){
        this.balls = [];
        this.canvasRef = canvasRef;
        this.canvasContext = this.canvasRef.getContext("2d")!;
        this.obstacles = createObstacles();
        this.sinks = createSinks();
        this.update();
        this.onFinish = onFinish;
        this.getMultiplier = getMultiplier;
    }

    addBall(startX?: number) {
        const newBall = new Ball(startX || WIDTH / 2 + 13, 50, this.canvasContext, this.obstacles, this.sinks,(index) => {
            this.balls = this.balls.filter(ball => ball !== newBall);
            this.onFinish?.(index, startX);
        }, ()=>{});
        this.balls.push(newBall);
    }

    drawObstacles() {
        this.canvasContext.fillStyle = 'white';
        this.obstacles.forEach((obstacle) => {
            this.canvasContext.beginPath();
            this.canvasContext.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
            this.canvasContext.fill();
            this.canvasContext.closePath();
        });
    }

    drawSinks() {
        const SPACING = obstacleRadius * 2;
        this.sinks.forEach((sink) =>{
            this.canvasContext.fillStyle = '#4CAF50';
            this.canvasContext.fillRect(sink.x, sink.y - sink.height / 2, sink.width - obstacleRadius * 2, sink.height);
            this.canvasContext.font='bold 13px Arial';
            this.canvasContext.fillRect(sink.x, sink.y - sink.height / 2, sink.width - SPACING, sink.height);
            this.canvasContext.fillStyle = "#000";
            this.canvasContext.fillText((sink?.multiplier)?.toString() + "x", sink.x - 15 + sinkWidth / 2, sink.y + 3);
        });
    }

    draw() {
        this.canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
        this.drawObstacles();
        this.drawSinks();
        this.balls.forEach(ball => {
            ball.draw();
            ball.update();
        });
    }
    
    update() {
        this.draw();
        this.requestId = requestAnimationFrame(this.update.bind(this));
    }

    stop() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }
    }

}