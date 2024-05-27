import React, {useState} from "react";
import {gameViews} from "../constants/game";
/* import axios from "axios"; */

export const GameContext = React.createContext();

const GameProvider = (props) => {
    const [puzzleLetters, setPuzzleLetters] = useState([]); //["M", "O", "T", "H", "E", "R"
    const [gameView, setGameView] = useState(gameViews.lobbyView); //gameViews.loginView, gameViews.playView, gameViews.scoreView, gameViews.errorView
    const [remainingTime, setRemainingTime] = useState(0);
    const [currentStage, setCurrentStage] = useState("gameStage"); //gameStage & resultStage
    const [username, setUsername] = useState("");


    return (
        <GameContext.Provider
            value={{currentStage, setCurrentStage, username, setUsername,gameView, setGameView, remainingTime, setRemainingTime, puzzleLetters, setPuzzleLetters}}
        >
            {props.children}
        </GameContext.Provider>
    );
};

export default GameProvider;
