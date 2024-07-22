import React, {useContext, useEffect, useState} from "react";
import "./App.scss";
import NavbarUnit from "./components/NavbarUnit";
import GameTableUnit from "./components/GameTable/GameTableUnit";
import GameIntroUnit from "./components/GameIntro/GameIntroUnit";
import {GameContext} from "./context/GameContext";
import {gameViews} from "./constants/game";
import CountDownUnit from "./components/CountDown/CountDownUnit";
import { api_get_game_data, api_verify_token } from "./api/api_calls";
import HighScoreBoardTotal from "./components/ScoreBoard/HighScoreBoardTotal";
import HighScoreBoardGame from "./components/ScoreBoard/HighScoreBoardGame";
import GameTableUnitForLobby from "./components/GameTable/GameTableUnitForLobby";
import CorrectAnswersUnit from "./components/GameBoard/CorrectAnswersUnit";
import useWebSocket from "./utils/useWebSocket";

function App() {
    const {gameView, setGameView, setPuzzleLetters, setRemainingTime} = useContext(GameContext); //development true, production false
    const [route, setRoute] = useState("game_board");
    
    const handleWebSocketMessage = (data) => {
        console.log("WebSocket message:", data);
        // Additional logic based on the message
        api_get_game_data().then((response) => {
            console.log("🚀 App.js ~ onmessage ~ response:", response)
            const {puzzle, remainingTime} = response.data;
            setPuzzleLetters(puzzle)
            setRemainingTime(remainingTime);
            
        })
        .catch((error) => {
            console.log("🚀 ~ App ~ error:", error)
        });

    };

    const handleWebSocketError = (error) => {
        console.error("WebSocket error:", error);
    };

    useWebSocket('ws://localhost:8080/ws', handleWebSocketMessage, handleWebSocketError);
    useEffect(() => {
        api_verify_token().then((response) => {
            const {isVerified} = response.data;
            if(isVerified){
                setGameView(gameViews.playView);
            }
        }).catch((error) => {
            console.log("App.js ~ api_verify_token ~ error:", error)
        });
    }, []);

    switch (gameView) {
        case gameViews.loginView:
            return (
                <div className="App">
                    <NavbarUnit />
                    <GameIntroUnit />
                </div>
            );
        case gameViews.playView:
            return (
                <div className="App">
                    <NavbarUnit />
                    <CountDownUnit/>
                    {route==="game_board" && <GameTableUnit /> }
                    {route==="score_board" && <HighScoreBoardTotal/>}
                    {route==="score_board" && <HighScoreBoardGame/>}
                    <div className="button_container-63">
                        <button onClick={()=>setRoute("game_board")} className="button-63">GAME BOARD</button>
                        <button onClick={()=>setRoute("score_board")} className="button-63">SCORE BOARD</button>
                    </div>              
                </div>
            );
        case gameViews.lobbyView:
            return (
                <div className="App">
                    <NavbarUnit />
                    <CountDownUnit/>
                    {route==="game_board" && <GameTableUnitForLobby /> }
                    {route==="game_board" &&   <CorrectAnswersUnit /> }
                    {route==="score_board" && <HighScoreBoardTotal/>}
                    {route==="score_board" && <HighScoreBoardGame/>}
                    <div className="button_container-63">
                        <button onClick={()=>setRoute("game_board")} className="button-63">GAME BOARD</button>
                        <button onClick={()=>setRoute("score_board")} className="button-63">SCORE BOARD</button>
                    </div>
                </div>
            );
        case gameViews.errorView:
            return (
                <div className="App">
                    <NavbarUnit />
                    "Error"
                </div>
            );
    }
}

export default App;
