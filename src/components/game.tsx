import { useEffect, useRef, useState } from "react";
import "../styles/canvas.css";
import { BallManager } from "./ballManager";
import { Button } from "./button";
import axios from "axios";
import { baseURL } from "../utils/commonUtil";
import {MULTIPLIERS} from "../components/objects";

function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();
  const [score, setScore] = useState<number[]>([]);

  const getMultiplier = (_score: number) => {
    setScore((score) => {
      let newScore = [...score];
      newScore.push(_score);
      newScore = newScore.splice(-4);
      return newScore;
  })}
  
  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current,
        getMultiplier
        );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  return (
    <div className="AppStyle">
      <canvas ref={canvasRef}  className="canvasStyle" width="800" height="800"></canvas>
      <Button
        onClick={async () => {
          const response = await axios.post(`${baseURL}/game`, {
            data: 1,
          });
          if (ballManager) {
            ballManager.addBall(response.data.point);
          }
        }}
      >
        Add Ball
      </Button>
      <div className="scoreStyle">
        {score.map((score, index) => {
          return <div className="IndividualScoresStyle">{MULTIPLIERS[score+1]}X</div>;
        })}
      </div>
    </div>
  );
}

export default Game;