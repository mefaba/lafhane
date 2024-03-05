import React, {useContext, useEffect} from "react";
import "./App.scss";
import NavbarUnit from "./components/NavbarUnit";
import GameTableUnit from "./components/GameTable/GameTableUnit";
import GameIntroUnit from "./components/GameIntro/GameIntroUnit";
import {GameContext} from "./context/GameContext";
import {gameViews} from "./constants/game";
import CountDownUnit from "./components/CountDown/CountDownUnit";
import { api_get_game_data } from "./api/api_calls";
import HighScoreBoard from "./components/ScoreBoard/HighScoreBoard";
import GameScoreBoard from "./components/ScoreBoard/GameScoreBoard";
import GameTableUnitForLobby from "./components/GameTable/GameTableUnitForLobby";
import CorrectAnswersUnit from "./components/GameBoard/CorrectAnswersUnit";
//import LeaderBoardUnit from "./components/LeaderBoard/LeaderBoardUnit";

function App() {
    const {gameView, setPuzzleLetters, setRemainingTime} = useContext(GameContext); //development true, production false
 
    useEffect(()=>{
        const  socket = new WebSocket('ws://localhost:8080/ws');
        socket.onopen = function(event) {
            console.log('WebSocket connection opened');
            socket.send('Hello, server!');
        };
    
        socket.onmessage = function(event) {
            console.log('Received message from server: ' + event.data);
            api_get_game_data().then((response) => {
                //console.log("🚀 App.js ~ api_get_game_data ~ response:", response)
                const {puzzle, remainingTime} = response.data;
                setPuzzleLetters(puzzle)
                setRemainingTime(remainingTime);
                
            })
            .catch((error) => {
                console.log("🚀 ~ App ~ error:", error)
            });

            /* if(event.data === "IN_PLAY"){
                setGameView(gameViews.playView)
            }
            else{
                setGameView(gameViews.lobbyView)
            } */
           
        };
    },[])


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
                    <GameTableUnit />
                    <div className="button_container">
                         <div className="button2">SCORE</div>
                    </div>
                </div>
            );
        case gameViews.lobbyView:
            return (
                <div className="App">
                    <NavbarUnit />
                    <GameTableUnitForLobby />
                    <CorrectAnswersUnit />
                    <HighScoreBoard/>
                    {/* <GameScoreBoard/> */}
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
