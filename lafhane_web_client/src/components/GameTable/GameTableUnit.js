import React, {useState, useEffect, useContext} from "react";
import "./GameTable.scss";
import {ReactComponent as SvgButton} from "../../assets/arrow-right-circle.svg";
import {CSSTransition} from "react-transition-group";
import {api_get_game_data, api_post_send_answer} from "../../api/api_calls.js";
import useGameStore  from "../../context/GameContext.js";

const GameTableUnit = () => {
    //TODO mockpuzzleLetters and mockdata_validAnswers should be fetched from server
    //const mockpuzzleLetters = "irpnnsiletbfooie";
    const [score, setScore] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [puzzleLetters, setPuzzleLetters] = useState("");
    const [validAnswers, setValidAnswers] = useState([]);
    const {setScoresTotal, setScoresGame} = useGameStore();

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await api_get_game_data();
                const {data} = response;
                setPuzzleLetters(data.puzzleLetters);
                setValidAnswers(data.correctAnswers);
                setScoresGame(data.playerScoresGame);
                setScoresTotal(data.playerScoresTotal);
            } catch (error) {
                console.error("Failed to fetchGameData()", error);
            }
        };

        fetchGameData();
    }, []);

    const sendAnswer = () => {
        //dont send duplicate answer
        if (validAnswers.includes(currentAnswer)) {
            console.log("Duplicate Answer");
            return;
        }
        api_post_send_answer(currentAnswer)
            .then((response) => {
                const {result} = response.data;
                if (result === "correct") {
                    setValidAnswers([...validAnswers, currentAnswer]);
                    setScore(response.data.score);
                }
            })
            .catch((error) => {
                console.log("🚀 ~ sendAnswer ~ error:", error);
            });
    };

    const handleAnswerSubmit = () => {
        sendAnswer();
        setCurrentAnswer("");
    };

    const handleInputChange = (e) => {
        setCurrentAnswer(e.target.value);
    };
    const handleTouchPress = (recieved_char) => {
        setCurrentAnswer(currentAnswer + recieved_char.toLowerCase());
    };

    return (
        <div className="game_container">
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
                classNames="game-container-"
            >
                <div className="game_container_inner">
                    {puzzleLetters
                        .toUpperCase().split("")
                        .map((char, index) => (
                            <div
                                key={index}
                                className="game_chars"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTouchPress(char);
                                }}
                            >
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
                    onKeyDown={(event) => (event.key === "Enter" ? handleAnswerSubmit() : null)}
                    onTouchStart={(e) => e.target.focus()}
                />

                <div className="btn" onClick={handleAnswerSubmit}>
                    <SvgButton />
                </div>
            </div>

            <div className="answer_list">
                {validAnswers
                    .slice()
                    .reverse()
                    .map((answer, index) => (
                        <div key={index}>{answer} </div>
                    ))}
            </div>
        </div>
    );
};

export default GameTableUnit;
