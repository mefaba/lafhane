import React from "react";
import {useContext} from "react";
import {GameContext} from "../../context/GameContext";
import {useState} from "react";

import "./GameIntro.scss";
import LottieLoading from "./LottieLoading.js";
//import Slideshow from "./Slideshow";
import Accordion from "./Accordion";
import {GameViews} from "../../constants/game.js";
import {api_register} from "../../api/api_calls.js";

function Register() {
    const {username, setUsername, setGameView} = useContext(GameContext);
    const [password, setPasword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        if (username.length > 3 && username.length < 11) {
            //check if username exists in database.
            api_register(username, password).then((response) => {
                    console.log("🚀 ~ login ~ response:", response);
                    if (response) {
                        // Delay the view change to playView by 1 second if login is successful
                        setTimeout(() => setGameView(GameViews.playView), 1000);
                    }
                })
                .catch((error) => {
                    setUsername("");
                    setPasword("");
                    setMessage("Invalid Username")
                    setGameView(GameViews.loginView);
                });
            setIsLoading(true);
        }

        setTimeout(() => {
            //Giriş başarısız olsa dahi 3 saniye sonra loading ekranı gitsin
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className="gameintro_container">
            {isLoading ? (
                <div className="main-intro">
                    <LottieLoading />
                </div>
            ) : (
                <>
                    <div className="main-intro">
                        <h2>Register</h2>
                        <p>Min length: 4, Max Length: 10</p>
                        <p>{message}</p>
                        <label htmlFor="username">Username: </label>
                        <input required minLength="4" type="text" id="username" onChange={(event) => setUsername(event.target.value)} />
                        <label htmlFor="password">New Password: </label>
                        <input required minLength="4" type="text" id="password" onChange={(event) => setPasword(event.target.value)} />
                        <button className="button-63" onClick={handleStart}>PLAY</button>
                        <p>OR</p>
                        <button onClick={() => setGameView(GameViews.loginView)} className="button-63">Login</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Register;
