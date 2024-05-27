import React, {useState}  from 'react';
import "./ScoreBoard.scss";

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
  return (
    <div id='gamescore_board'>
      <h2>Game Scores</h2>
      <ul>
        {gamescores.map((score, index) => {
          const playerName = Object.keys(score)[0];
          const playerScore = score[playerName];
          return (
            <li key={index}>
              {playerName}: {playerScore}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HighScoreBoardGame;