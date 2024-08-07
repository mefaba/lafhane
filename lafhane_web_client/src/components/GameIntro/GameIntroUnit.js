import React from "react";
import {useContext} from "react";
import {GameContext} from "../../context/GameContext";
import {useState} from "react";

import "./GameIntro.scss";
import LottieLoading from "./LottieLoading.js";
//import Slideshow from "./Slideshow";
import Accordion from "./Accordion";
import {GameViews} from "../../constants/game.js";
import {api_login} from "../../api/api_calls.js";

function GameIntroUnit() {
    const {username, setUsername, setIsStarted, setGameView} = useContext(GameContext);
    const [password, setPasword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        if (username.length > 3 && username.length < 11) {
            //check if username exists in database.
            api_login(username, password).then((response) => {
                    console.log("🚀 ~ login ~ response:", response);
                    if (response) {
                        // Delay the view change to playView by 1 second if login is successful
                        setTimeout(() => setGameView(GameViews.playView), 1000);
                    }
                })
                .catch((error) => {
                    console.log("Error:", error);
                    setUsername("");
                    setGameView(GameViews.loginView);
                });
            setIsLoading(true);
            setMessage("We are unable to fullfill login request. Try again or Register");
        }

        setTimeout(() => {
            //Giriş başarısız olsa dahi 3 saniye sonra loading ekranı gitsin
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className="gameintro_container">
            <Accordion />

            {isLoading ? (
                <div className="main-intro">
                    <LottieLoading />
                </div>
            ) : (
                <>
                    <div className="main-intro">
                        <h2>Login</h2>
                        <p>Min length: 4, Max Length: 10</p>
                        <label htmlFor="username">Username: </label>
                        <input required minLength="4" type="text" id="username" onChange={(event) => setUsername(event.target.value)} />
                        <label htmlFor="username">Password: </label>
                        <input required minLength="4" type="text" id="password" onChange={(event) => setPasword(event.target.value)} />
                        <button className="button-63" onClick={handleStart}>PLAY</button>
                        <p>{message}</p>
                        <div onClick={() => setGameView(GameViews.registerView)} className="custom_link">Register</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default GameIntroUnit;
