import React from "react";
import GameTableUnit from "../../components/GameTable/GameTableUnit";
import CountDownUnit from "../../components/CountDown/CountDownUnit";

const GamePlayView = () => {
    return (
        <div className="navbar">
            <h1>Game Play View</h1>
            <CountDownUnit/>
            <GameTableUnit />
            <button>Time Left 02:30</button>
            <button>Scores</button>
        </div>
    );
};

export default GamePlayView;
