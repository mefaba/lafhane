import React, {useState, useEffect} from "react";
import io from "socket.io-client";
import axios from "axios";
import "./GameTable.scss";
import CountDownUnit from "../CountDown/CountDownUnit.js";
import Result from "../ResultComponent/Result.component.js";
import {GameContext} from "../../context/GameContext.js";
import {ReactComponent as SvgButton} from "../../assets/arrow-right-circle.svg";
import {useContext} from "react";
import {CSSTransition} from "react-transition-group";
import {ShortBreak} from "../index.js";
import LeaderBoardUnit from "../LeaderBoard/LeaderBoardUnit.js";

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
const GameTableUnit = () => {
    //TODO mockpuzzleLetters and mockdata_validAnswers should be fetched from server
    //const mockpuzzleLetters = "irpnnsiletbfooie";

    const mockdata_validAnswers = [
        "sit",
        "bek",
        "cet",
        "asi",
        "bet",
        "met",
        "dem",
        "kem",
        "ece",
        "tek",
        "eti",
        "ket",
        "tem",
        "fit",
        "bas",
        "sif",
        "bit",
        "cem",
        "ekme",
        "beis",
        "emek",
        "deme",
        "süet",
        "düet",
        "sabi",
        "site",
        "kete",
        "keme",
        "asit",
        "beti",
        "abis",
        "emet",
        "etek",
        "sübek",
        "tebaa",
        "emcek",
        "demek",
        "metis",
        "basit",
        "sümek",
        "demet",
        "bitek",
        "sabit",
        "tekme",
        "abece",
        "sitem",
        "ecet",
        "sabite",
        "isabet",
    ];
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [puzzleLetters, setPuzzleLetters] = useState("");
    const {} = useContext(GameContext);

    const get_game_data = async () => {
        await axios
            .get(`${process.env.REACT_APP_ACTIVESERVER}/api/gamedata`, {
                headers: {
                    "Authorization": `Bearer 12345`,
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((response) => {
                const {puzzle} = response.data;
                setPuzzleLetters(puzzle);
            })
            .catch((error) => {
                console.log("🚀 ~ get_game_data ~ error", error);
            });
    };

    const post_check_answer = async () => {
        await axios
            .post(`${process.env.REACT_APP_ACTIVESERVER}/api/check_answer`, {
                answer: currentAnswer,
            }, {
                
                headers: {
                    "Authorization": `Bearer 12345`,
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((response) => {
                const {resultStatus, resultData} = response.data;
                if (resultStatus === "correct") {
                    //Update score
                    setScore(resultData);
                }
            })
            .catch((error) => {});
    };


    useEffect(() => {
        get_game_data();
        // eslint-disable-next-line
    }, []);

    const handleInputChange = (e) => {
        setCurrentAnswer(e.target.value);
    };
    const handleTouchPress = (recieved_char) => {
        setCurrentAnswer(currentAnswer + recieved_char);
    };
    const handleAnswerSubmit = () => {
        //checkanswer
        post_check_answer();
        setCurrentAnswer("");
    };
    return (
        <div className="game_container">
            <div className="button_container">
                <div className="mobile_score">SCORE {score}</div>
            </div>
            <CSSTransition
                in={true}
                timeout={{
                    appear: 2000,
                    enter: 0,
                    exit: 800,
                }}
                onExited={false}
                unmountOnExit
                appear={true}
                classNames="game-container-"
            >
                <div className="game_container_inner">
                    {puzzleLetters.split("").map((char, index) => (
                        <div key={index} className="game_chars" onClick={() => handleTouchPress(char)}>
                            <p>{char}</p>
                        </div>
                    ))}
                </div>
            </CSSTransition>

            <div className="game_input_answer">
                <input
                    type="text"
                    value={currentAnswer}
                    onChange={handleInputChange}
                    onKeyPress={(event) => (event.charCode === 13 ? handleAnswerSubmit() : null)}
                />

                <div className="btn" onClick={handleAnswerSubmit}>
                    <SvgButton />
                </div>
            </div>
        </div>
    );
};

export default GameTableUnit;
