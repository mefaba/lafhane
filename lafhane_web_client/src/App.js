import React, {useContext} from "react";
import "./App.scss";
import NavbarUnit from "./components/NavbarUnit";
import GameTableUnit from "./components/GameTable/GameTableUnit";
import GameIntroUnit from "./components/GameIntro/GameIntroUnit";
import {GameContext} from "./context/GameContext";
//import LeaderBoardUnit from "./components/LeaderBoard/LeaderBoardUnit";

function App() {
    const {isStarted} = useContext(GameContext); //development true, production false

    return (
        <div className="App">
            <NavbarUnit />

            {isStarted ? (
                <>
                    <GameTableUnit />
                </>
            ) : (
                <GameIntroUnit />
            )}
        </div>
    );
}

export default App;
