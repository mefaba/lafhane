import React, { useContext } from "react";
import NavbarUnit from "../components/NavbarUnit";
import Login from "../components/GameIntro/Login";
import Register from "../components/GameIntro/Register";
import useGameStore from "../context/GameContext";
import { GAMEVIEW } from "../constants/game";


export const HomePage = () => {
    const {gameView} = useGameStore();

    switch (gameView) {
        case GAMEVIEW.login:
            return (
                <div className="App">
                    <NavbarUnit />
                    <Login />
                </div>
            );
        case GAMEVIEW.register:
            return (
                <div className="App">
                    <NavbarUnit />
                    <Register />
                </div>
            );
        default:
            return (
                <div className="App">
                    <NavbarUnit />
                    <Login />
                </div>
            );
    }
};
