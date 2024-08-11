import React, {useContext, useState}  from 'react';
import "./ScoreBoard.scss";
import { GameContext } from '../../context/GameContext';

const mock_gamescores = [
    { "Alice": 50 },
    { "Bob": 20 },
    { "Charlie": 10 },
    { "David": 10 },
    { "Eve": 9 },
    { "Frank": 5 },
    { "Grace": 8 },
    { "Hank": 7 },
    { "Ivy": 7 },
    { "Jack": 6 }
  ];
const HighScoreBoardGame = () => {
    const [gamescores, setGamescores] = useState(mock_gamescores);
    const {scoresGame}= useContext(GameContext); 
  
  return (
    <div id='gamescore_board'>
            <div className="game_leaderboard">
                <h2>
                    Last Game
                </h2>
                <ol>
                    {scoresGame.map((eachdata, index) => {
                        return (
                            <li key={index}>
                                <span className="name">{eachdata.playerName}</span>
                                <span className="percent">{eachdata.score}</span>
                            </li>
                        );
                    })}
                </ol>
                <p>
                    <small>Score</small>
                </p>
            </div>
    </div>
  );
};

export default HighScoreBoardGame;