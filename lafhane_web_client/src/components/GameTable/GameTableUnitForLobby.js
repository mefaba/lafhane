import React, {useState, useEffect} from "react";
import "./GameTableForLobby.scss";
import {GameContext} from "../../context/GameContext.js";
import {useContext} from "react";
import {CSSTransition} from "react-transition-group";
import { api_get_game_data } from "../../api/api_calls.js";


const GameTableUnitForLobby = () => {
    //TODO mockpuzzleLetters and mockdata_validAnswers should be fetched from server
    //const mockpuzzleLetters = "irpnnsiletbfooie";
    const [score] = useState(0);
    const [puzzleLetters, setPuzzleLetters] = useState("");
    const{setScoresTotal, setScoresGame,setPuzzleAnswerList}= useContext(GameContext);


    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await api_get_game_data();
                const {data} = response;
                setPuzzleLetters(data.puzzleLetters);
                setScoresGame(data.playerScoresGame);
                setScoresTotal(data.playerScoresTotal);
                setPuzzleAnswerList(data.puzzleAnswerList);
            } catch (error) {
                console.error("Failed to fetch game data:", error);
            }
        };

        fetchGameData();
    }, []);

    return (
        <div className="game_lobby_container">
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
                    {puzzleLetters.toUpperCase().split("").map((char, index) => (
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
