import React, {useState, useEffect, useContext} from "react";
import "./GameTable.scss";
import {ReactComponent as SvgButton} from "../../assets/arrow-right-circle.svg";
import {CSSTransition} from "react-transition-group";
import {api_get_game_data, api_post_send_answer} from "../../api/api_calls.js";
import { useGameStore, useUIStore } from "../../context/GameContext.js";
import LottieSuccess from "./LottieSuccess.js";

const GameTableUnit = () => {
    const {validAnswers, setValidAnswers} = useUIStore();
    const {setScoresTotal, setScoresGame} = useGameStore();
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [puzzleLetters, setPuzzleLetters] = useState("");
    const [score, setScore] = useState(0);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await api_get_game_data();
                const {data} = response;
                setPuzzleLetters(data.puzzleLetters);
                setScoresGame(data.playerScoresGame);
                setScoresTotal(data.playerScoresTotal);
                setValidAnswers(data.correctAnswers); //data.correctAnswers will always be [] 
                setScore(data.score)
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
                    setValidAnswers([...validAnswers, currentAnswer.toLowerCase()]);
                    setScore(response.data.score);
                    setShowSuccessAnimation(true);

                    setTimeout(() => {
                        setShowSuccessAnimation(false);
                    }, 3000);
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
            {showSuccessAnimation && (<div className="success_lottie_top_left"><LottieSuccess /></div>)}
            {showSuccessAnimation && (<div className="success_lottie_top_right"><LottieSuccess /></div>)}
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
                        .toUpperCase()
                        .split("")
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
