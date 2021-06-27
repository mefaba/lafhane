import React from "react";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import "./ResultComponent.scss";

function Result({ correctAnswers, data_validAnswers, point }) {
  const { currentStage } = useContext(GameContext);

  if (currentStage === "gameStage") {
    return (
      <>
        <div> Puan: {point}</div>
        <p>Cevaplar</p>
        {correctAnswers.length
          ? correctAnswers.map((answer, index) => (
              <div key={index}>
                {answer} - {answer.length * 2 - 3}
              </div>
            ))
          : null}
      </>
    );
  } else if (currentStage === "resultStage") {
    return (
      <>
        <div> Puan: {point}</div>
        <p>Tüm Laflar</p>
        {data_validAnswers.length
          ? data_validAnswers
              .sort((a, b) => b.length - a.length)
              .map((answer, index) => (
                <div key={index}>
                  {answer} - {answer.length * 2 - 3}
                </div>
              ))
          : null}
      </>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default Result;
