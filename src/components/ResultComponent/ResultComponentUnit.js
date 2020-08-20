import React from "react";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import "./ResultComponent.scss"

function ResultComponentUnit({correctAnswers,data_validAnswers}) {
	const { currentStage } = useContext(GameContext);

	if (currentStage === "gameStage") {
		return (
			<div>
				<p>Cevaplar</p>
                {correctAnswers.length?correctAnswers.map((answer,index)=>(<div key={index}>{answer} - {answer.length*2-3}</div>)):null}
			</div>
		);
	} else if (currentStage === "resultStage") {
		return (
            <div>
                <p>Tüm Laflar</p>
                {data_validAnswers.length?data_validAnswers.sort((a,b)=>b.length-a.length).map((answer,index)=>(<div key={index}>{answer} - {answer.length*2-3}</div>)):null}
            </div>
        )
	} else {
		return <div>Loading</div>;
	}
}

export default ResultComponentUnit;
