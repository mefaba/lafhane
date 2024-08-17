import React, {useState, useContext} from "react";
import "./ScoreBoard.scss";
import { useGameStore } from "../../context/GameContext";

const mock_highscores = [
  {"playerName": "Alice", "score": 150},
  {"playerName": "Bob", "score": 120},
  {"playerName": "Charlie", "score": 110},
  {"playerName": "David", "score": 100},
  {"playerName": "Eve", "score": 90},
  {"playerName": "Frank", "score": 85},
  {"playerName": "Grace", "score": 80},
  {"playerName": "Hank", "score": 75},
  {"playerName": "Ivy", "score": 70},
  {"playerName": "Jack", "score": 65}
]
const HighScoreBoardTotal = () => {
    //const [highscores, setHighscores] = useState(mock_highscores);
    const {scoresTotal}= useGameStore(); 
    return (
        <div id="highscore_board">
            <div className="leaderboard">
                <h2>
                    Leaderboard 
                </h2>
                <ol>
                    {scoresTotal.map((eachdata, index) => {
                        return (
                            <li key={index}>
                                <span className="name">{eachdata.playerName}</span>
                                <span className="percent">{eachdata.score}</span>
                            </li>
                        );
                    })}
                </ol>
                <p>
                    <small>Daily Score</small>
                </p>
            </div>
        </div>
    );
};

export default HighScoreBoardTotal;
