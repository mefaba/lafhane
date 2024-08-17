import React, {useContext, useState}  from 'react';
import "./ScoreBoard.scss";
import { useGameStore } from '../../context/GameContext';

const HighScoreBoardGame = () => {
    const {scoresGame}= useGameStore(); 
  
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