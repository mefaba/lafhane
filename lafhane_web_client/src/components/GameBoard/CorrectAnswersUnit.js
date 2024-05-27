import React, {useState, useEffect} from "react";
import "./CorrectAnswersUnit.scss";

const gameData = {
    puzzle: "irpnnsiletbfooie",
    player: "test1",
    gameAnswers: { "sif": 3, "bit": 3, "cem": 3, "ekme": 3, "sitem": 3, "ecet": 3, "sabite": 3, "isabet": 3 },
    playerCorrectAnswers: {
        "sif": 3,
        "bit": 3,
        "cem": 3,
    },
    playerGameScore: 5,
    highScoresGame: {test1: 10, test2: 20, test3: 30},
    highScoresTotal: {test1: 100, test2: 200, test3: 300},
};
const CorrectAnswersUnit = () => {
    const [gameAnswers] = useState(gameData.gameAnswers);
    return (
        <div id="correct-answers-unit">
        <h2>Answers</h2>
        <ul>
        {Object.entries(gameAnswers).map(([key, value]) => {
            if(Object.keys(gameData.playerCorrectAnswers).includes(key)){
                return(
                    <li key={key} className="correct_label">
                        {key}: {value}
                    </li>
                )
            }else{
                return(
                    <li key={key}>
                        {key}: {value}
                    </li>
                )
            }
       
        })}
        </ul>
        </div>
    );
};

export default CorrectAnswersUnit;