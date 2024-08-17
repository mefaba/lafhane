import React, {useContext} from "react";
import "./CorrectAnswersUnit.scss";
import { useGameStore, useUIStore } from "../../context/GameContext";

const CorrectAnswersUnit = () => {
    const {puzzleAnswerList} = useGameStore();
    const {validAnswers} = useUIStore();
    console.log("🚀 ~ CorrectAnswersUnit ~ validAnswers:", validAnswers)
    return (
        <div id="correct-answers-unit">
            <div className="answers-grid">
                {puzzleAnswerList && puzzleAnswerList.map((word, index) => (
                    <div 
                        key={index}
                        style={{ color: validAnswers.includes(word) ? '#43ff00' : 'inherit' }}
                    >
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CorrectAnswersUnit;