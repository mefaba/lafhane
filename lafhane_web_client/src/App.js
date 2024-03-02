import React, {useContext} from "react";
import "./App.scss";
import NavbarUnit from "./components/NavbarUnit";
import GameTableUnit from "./components/GameTable/GameTableUnit";
import GameIntroUnit from "./components/GameIntro/GameIntroUnit";
import {GameContext} from "./context/GameContext";
import {gameViews} from "./constants/game";
//import LeaderBoardUnit from "./components/LeaderBoard/LeaderBoardUnit";

function App() {
    const {gameView} = useContext(GameContext); //development true, production false
    console.log("🚀 ~ App ~ gameView:", gameView);

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
                    <GameTableUnit />
                </div>
            );
        case gameViews.lobbyView:
            return (
                <div className="App">
                    <NavbarUnit />
                    "GameScoreUnit"
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
