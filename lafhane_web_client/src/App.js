import React, {useCallback, useContext, useEffect, useState} from "react";
import "./App.scss";
import NavbarUnit from "./components/NavbarUnit";
import GameTableUnit from "./components/GameTable/GameTableUnit";
import GameIntroUnit from "./components/GameIntro/GameIntroUnit";
import {GameContext} from "./context/GameContext";
import {GameViews} from "./constants/game";
import CountDownUnit from "./components/CountDown/CountDownUnit";
import {api_get_game_data, api_verify_token, removeAuthToken} from "./api/api_calls";
import HighScoreBoardTotal from "./components/ScoreBoard/HighScoreBoardTotal";
import HighScoreBoardGame from "./components/ScoreBoard/HighScoreBoardGame";
import GameTableUnitForLobby from "./components/GameTable/GameTableUnitForLobby";
import CorrectAnswersUnit from "./components/GameBoard/CorrectAnswersUnit";
import useWebSocket from "./utils/useWebSocket";
import Register from "./components/GameIntro/Register";

function App() {
    const {gameView, setGameView,  setRemainingTime} = useContext(GameContext); //development true, production false
    const [gameId, setGameId] = useState(null);
    const [route, setRoute] = useState("game_board");
    const [isVerified, setIsVerified] = useState(false);
    

    const handleWebSocketMessage = useCallback(
        (response) => {
            const data = JSON.parse(response);
            setRemainingTime(data.remainingTime);
            setGameId(data.gameId);
            if(isVerified) {
                setGameView(data.gameState === "IN_PLAY" ? GameViews.playView : GameViews.lobbyView);
            }
        },
        [isVerified,setGameView, setRemainingTime]
    );

    const handleWebSocketError = useCallback((error) => {
        console.error("WebSocket error:", error);
    }, []);

    const [socket] = useWebSocket("ws://localhost:8080/ws", handleWebSocketMessage, handleWebSocketError);
    
  
    
    useEffect(() => {
        console.log("triggered");
        api_verify_token()
            .then((response) => {
                const {isVerified} = response.data;
                if (isVerified) {
                    setGameView(GameViews.playView);
                    setIsVerified(true);
                }
            })
            .catch((error) => {
                console.log("App.js ~ api_verify_token ~ error:", error);
                setGameView(GameViews.loginView);
                setIsVerified(false);
            });
    }, []);

    const Logout = () => {
        console.log("🚀 ~ Logout ~ Logout:", Logout)
        setGameView(GameViews.loginView);
        removeAuthToken();
        socket.close()
    };


    switch (gameView) {
        case GameViews.loginView:
            return (
                <div className="App">
                    <NavbarUnit />
                    <GameIntroUnit />
                </div>                
            );
        case GameViews.registerView:
            return (
                <div className="App">
                    <NavbarUnit />
                    <Register/>
                </div>
            );
        case GameViews.playView:
            return (
                <div className="App">
                    <NavbarUnit />
                    <CountDownUnit />
                    {route === "game_board" && <GameTableUnit />}
                    {route === "score_board" && <HighScoreBoardTotal />}
                    {route === "score_board" && <HighScoreBoardGame />}
                    <div className="button_container-63">
                        {route === "score_board" ? (
                            <button onClick={() => setRoute("game_board")} className="button-63">
                                BACK
                            </button>
                        ) : (
                            <>
                            <button onClick={() => setRoute("score_board")} className="button-63">
                                SCORE BOARD
                            </button>
                            <button onClick={Logout}  className="button-63"> LOGOUT</button>
                            </>
                        )}
                           
                    </div>
                </div>
            );
        case GameViews.lobbyView:
            return (
                <div className="App">
                    <NavbarUnit />
                    <CountDownUnit />
                    {route === "game_board" && <GameTableUnitForLobby />}
                    {route === "game_board" && <CorrectAnswersUnit />}
                    {route === "score_board" && <HighScoreBoardTotal />}
                    {route === "score_board" && <HighScoreBoardGame />}
                    <div className="button_container-63">
                        {route === "score_board" ? (
                            <button onClick={() => setRoute("game_board")} className="button-63">
                                BACK
                            </button>
                        ) : (
                            <>
                            <button onClick={() => setRoute("score_board")} className="button-63">
                                SCORE BOARD
                            </button>
                            <button onClick={Logout}  className="button-63"> LOGOUT</button>
                            </>
                        )}
                           
                    </div>
                    
                </div>
            );
        case GameViews.errorView:
            return (
                <div className="App">
                    <NavbarUnit />
                    "Error"
                </div>
            );
    }
}

export default App;
