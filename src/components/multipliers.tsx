import React from "react";
import { useState,useEffect } from "react";
import "../styles/canvas.css";

function Multipliers(){
    let [score,setScore] = useState<number[]>([]);

    function updateScorecard(n: number) {
        setScore((score) => {
            let newScore = [...score];
            newScore.push(n);
            newScore = newScore.slice(-4);
            return newScore;
    });
}

    return(
        <div className="scoreStyle">
            {
                score.map((score,index) => {
                return <div key={index}>{score}</div>
                })
            }
        </div>
    );
}
export default Multipliers;
