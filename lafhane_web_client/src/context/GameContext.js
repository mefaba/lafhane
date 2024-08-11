import React, {useState} from "react";
import {GameViews} from "../constants/game";
/* import axios from "axios"; */

export const GameContext = React.createContext();

const GameProvider = (props) => {
    const [puzzleLetters, setPuzzleLetters] = useState([]); //["M", "O", "T", "H", "E", "R"
    const [puzzleAnswerList, setPuzzleAnswerList] = useState([]);
    const [gameView, setGameView] = useState(GameViews.loginView); //gameViews.loginView, gameViews.playView, gameViews.scoreView, gameViews.errorView
    const [remainingTime, setRemainingTime] = useState(0);
    const [currentStage, setCurrentStage] = useState("gameStage"); //gameStage & resultStage
    const [username, setUsername] = useState("");
    const [scoresGame, setScoresGame] = useState([]);
    const [scoresTotal, setScoresTotal] = useState([]);

    return (
        <GameContext.Provider
            value={{
                currentStage,
                setCurrentStage,
                username,
                setUsername,
                gameView,
                setGameView,
                remainingTime,
                setRemainingTime,
                puzzleLetters,
                setPuzzleLetters,
                puzzleAnswerList,
                setPuzzleAnswerList,
                scoresGame,
                setScoresGame,
                scoresTotal,
                setScoresTotal,
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
};

export default GameProvider;
