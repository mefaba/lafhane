import React, {useState}  from 'react';
import "./ScoreBoard.scss";

const mock_highscores = [
    { "Alice": 150 },
    { "Bob": 120 },
    { "Charlie": 110 },
    { "David": 100 },
    { "Eve": 90 },
    { "Frank": 85 },
    { "Grace": 80 },
    { "Hank": 75 },
    { "Ivy": 70 },
    { "Jack": 65 }
  ];
const HighScoreBoardTotal = () => {
    const [highscores, setHighscores] = useState(mock_highscores);
  return (
    <div id='highscore_board'>
      <h2>High Scores</h2>
      <ul>
        {highscores.map((score, index) => {
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

export default HighScoreBoardTotal;