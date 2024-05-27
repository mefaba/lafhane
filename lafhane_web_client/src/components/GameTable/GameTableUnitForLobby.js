import React, {useState, useEffect} from "react";
import "./GameTableForLobby.scss";
import {GameContext} from "../../context/GameContext.js";
import {useContext} from "react";
import {CSSTransition} from "react-transition-group";
import { api_get_game_data, api_post_check_answer } from "../../api/api_calls.js";

const gameData = {
    puzzle: "irpnnsiletbfooie",
    player: "test1",
    playerCorrectAnswers: {
        "sif": 3,
        "bit": 3,
        "cem": 3,
        "ekme": 3,
        "sitem": 3,
        "ecet": 3,
        "sabite": 3,
        "isabet": 3,
    },
    playerGameScore: 5,
    highScoresGame: {test1: 10, test2: 20, test3: 30},
    highScoresTotal: {test1: 100, test2: 200, test3: 300},
};
const GameTableUnitForLobby = () => {
    //TODO mockpuzzleLetters and mockdata_validAnswers should be fetched from server
    //const mockpuzzleLetters = "irpnnsiletbfooie";
    const [score] = useState(0);
    const [puzzleLetters, setPuzzleLetters] = useState("");
    const {setRemainingTime} = useContext(GameContext);
 

    const getGameData = async () => {
        await api_get_game_data()
            .then((response) => {
                const {puzzle, remainingTime} = response.data;
                console.log("🚀 ~ .GameTableUnit ~ remainingTime:", remainingTime)
                setPuzzleLetters(puzzle);
                setRemainingTime(remainingTime);
            })
            .catch((error) => {
                console.log("🚀 ~ getGameData ~ error", error);
            });
    };

    useEffect(() => {
        getGameData();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="game_lobby_container">
            <div className="button_container">
                <div className="button1">SCORE {score}</div>
            </div>
            <CSSTransition
                in={true}
                timeout={{
                    appear: 2000,
                    enter: 0,
                    exit: 800,
                }}
                unmountOnExit
                appear={true}
                classNames="game_lobby-container-"
            >
                <div className="game_lobby_container_inner">
                    {puzzleLetters.split("").map((char, index) => (
                        <div key={index} className="game_lobby_chars">
                            <p>{char}</p>
                        </div>
                    ))}
                </div>
            </CSSTransition>
        </div>
    );
};

export default GameTableUnitForLobby;
