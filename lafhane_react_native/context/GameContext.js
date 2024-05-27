import React, { useReducer, useState } from "react";
import { badgeReducer } from "./GamerReducers";
/* import axios from "axios"; */

export const GameContext = React.createContext();

const GameProvider = (props) => {
  const [currentStage, setCurrentStage] = useState("gameStage"); //gameStage & resultStage
  const [username, setUsername] = useState("");
  const [display, setDisplay] = useState(true);

  const [badgeView, dispatch] = useReducer(badgeReducer, {
    view: "hidden",
    point: 0,
    answer: "Answer",
    answerStatus: true,
  });

  const triggerBadge = (type, answer) => {
    dispatch({ type: type, payload: answer });
  };
  return (
    <GameContext.Provider
      value={{
        currentStage,
        setCurrentStage,
        username,
        setUsername,
        badgeView,
        triggerBadge,
        display,
        setDisplay,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
