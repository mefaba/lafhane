import React, { useEffect, useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { api_verify_token } from "./api/api_calls";
import "./App.scss";
import LottieLoading from "./components/GameIntro/LottieLoading";
import useGameStore from "./context/GameContext";
import { GamePage } from "./pages/GamePage";
import { HomePage } from "./pages/HomePage";

function App() {
    const {isconnected, setIsconnected} = useGameStore(); //development true, production false
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api_verify_token()
            .then((response) => {
                const {isVerified} = response.data;
                if (isVerified) {
                    setIsconnected(true);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log("App.js ~ api_verify_token ~ error:", error);
                setIsconnected(false);
                setLoading(false);
            });
    }, []);

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

    return (
        <MemoryRouter>
            <Routes>
                <Route path="/game" element={<GamePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </MemoryRouter>
    );
}

export default App;
