import React from "react";
import GameTableUnit from "../../components/GameTable/GameTableUnit";

const GameLobbyView = () => {
    return (
        <div className="navbar">
            <h1>Game Play View</h1>
            <GameTableUnit />
            "AnswersUnit"
            <button>Time Left 00:59</button>
            <button>Scores</button>
        </div>
    );
};

export default GameLobbyView;
