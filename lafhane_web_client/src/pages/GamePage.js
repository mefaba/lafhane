import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "../api/api_calls";
import CountDownUnit from "../components/CountDown/CountDownUnit";
import CorrectAnswersUnit from "../components/GameBoard/CorrectAnswersUnit";
import LottieLoading from "../components/GameIntro/LottieLoading";
import GameTableUnit from "../components/GameTable/GameTableUnit";
import GameTableUnitForLobby from "../components/GameTable/GameTableUnitForLobby";
import NavbarUnit from "../components/NavbarUnit";
import HighScoreBoardGame from "../components/ScoreBoard/HighScoreBoardGame";
import HighScoreBoardTotal from "../components/ScoreBoard/HighScoreBoardTotal";
import { GAMEVIEW } from "../constants/game";
import useGameStore from "../context/GameContext";
import useWebSocket from "../utils/useWebSocket";

export const GamePage = () => {
    const navigate = useNavigate();
    const {isconnected, setIsconnected, setGameView, setRemainingTime,gameView} = useGameStore(); //development true, production false

    const [view, setview] = useState("game_board");
    const [loading, setLoading] = useState(true);

    const handleWebSocketMessage = (response) => {
        const data = JSON.parse(response);
        setRemainingTime(data.remainingTime);
        if (data.gameState === "IN_PLAY") {
            setGameView(GAMEVIEW.play);
        } else if (data.gameState === "IN_LOBBY") {
            setGameView(GAMEVIEW.lobby);
        }
        setLoading(false);
    };

    const handleWebSocketError = useCallback((error) => {
        console.error("WebSocket error:", error);
        setLoading(false);
        navigate("/home");
    }, []);

    const [socket] = useWebSocket(process.env.REACT_APP_WEBSOCKET, handleWebSocketMessage, handleWebSocketError);

    const Logout = () => {
        removeAuthToken();
        setIsconnected(false);
        navigate("/home");
    };

    if (loading) {
        return (
            <div className="App">
                <div className="gameintro_container">
                    <div className="main-intro">
                        <LottieLoading />
                    </div>
                </div>
            </div>
        );
    }

    switch (gameView) {
        case GAMEVIEW.play:
            return (
                <div className="App">
                    <NavbarUnit />
                    <CountDownUnit />
                    {view === "game_board" && <GameTableUnit />}
                    {view === "score_board" && <HighScoreBoardTotal />}
                    {view === "score_board" && <HighScoreBoardGame />}
                    <div className="button_container-63">
                        {view === "score_board" ? (
                            <button onClick={() => setview("game_board")} className="button-63">
                                BACK
                            </button>
                        ) : (
                            <>
                                <button onClick={() => setview("score_board")} className="button-63">
                                    SCORE BOARD
                                </button>
                                <button onClick={Logout} className="button-63">
                                    {" "}
                                    LOGOUT
                                </button>
                            </>
                        )}
                    </div>
                </div>
            );
        case GAMEVIEW.lobby:
            return (
                <div className="App">
                    <NavbarUnit />
                    <CountDownUnit />
                    {view === "game_board" && <GameTableUnitForLobby />}
                    {view === "game_board" && <CorrectAnswersUnit />}
                    {view === "score_board" && <HighScoreBoardTotal />}
                    {view === "score_board" && <HighScoreBoardGame />}
                    <div className="button_container-63">
                        {view === "score_board" ? (
                            <button onClick={() => setview("game_board")} className="button-63">
                                BACK
                            </button>
                        ) : (
                            <>
                                <button onClick={() => setview("score_board")} className="button-63">
                                    SCORE BOARD
                                </button>
                                <button onClick={Logout} className="button-63">
                                    {" "}
                                    LOGOUT
                                </button>
                            </>
                        )}
                    </div>
                </div>
            );
        default:
            return <div>Error Loading Game</div>;
    }
};
