import React, {useContext} from "react";
import "./CorrectAnswersUnit.scss";
import useGameStore from "../../context/GameContext";

const CorrectAnswersUnit = () => {
    const {puzzleAnswerList} = useGameStore();
    return (
        <div id="correct-answers-unit">
            <div className="answers-grid">
                {puzzleAnswerList && puzzleAnswerList.map((word, index) => (
                    <div key={index}>
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CorrectAnswersUnit;