import React from "react";

import axios from "axios";
import {useContext} from "react";
import {GameContext} from "../../context/GameContext";
import {useState} from "react";

import "./GameIntro.scss";
import LottieLoading from "./LottieLoading.js";
//import Slideshow from "./Slideshow";
import Accordion from "./Accordion";
import {gameViews} from "../../constants/game.js";

function GameIntroUnit() {
    const {username, setUsername, setIsStarted, setGameView} = useContext(GameContext);
    const [password, setPasword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendUsernameToAPI = () => {
        //TODO
        const headerToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        axios
            .post(
                `${process.env.REACT_APP_ACTIVESERVER}/login`,
                {
                    username: username,
                    password: password
                },
                {
                    headers: {
                        "Authorization": `Bearer ${headerToken}`,
                        "Access-Control-Allow-Origin": "*",
                    },
                    validateStatus: function (status) {
                        return status >= 200 && status < 300; // default, but added for clarity. Axios throws error if status is not between 200-299
                    },
                }
            )
            .then((response) => {
                console.log("🚀 ~ .then ~ data:", response);
                const {jwtToken} = response.data;
                // Save JWT token to cookies
                document.cookie = `jwtToken=${jwtToken}`;
                setTimeout(() => setGameView(gameViews.playView), 1000);
                console.log("🚀 setGameView");
            })
            .catch((error) => {
                console.log("🚀 ~ sendUsernameToAPI ~ error:", error);
                // Handle error if necessary
                setUsername("");
                setGameView(gameViews.loginView);
            });
    };
    
    const handleStart = () => {
        if (username.length > 3 && username.length < 11) {
            //check if username exists in database.
            sendUsernameToAPI();
            setIsLoading(true);
            setMessage("Hoşgeldiniz yada Tekrar Deneyin. Bu isimde bir kullanıcı zaten oyunda olabilir. Farklı bir isim deneyin.");
        }

        setTimeout(() => {
            //Giriş başarısız olsa dahi 3 saniye sonra loading ekranı gitsin
            setIsLoading(false);
        }, 3000);

        /* console.log(username) */
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
                        <h2>Lafhane</h2>
                        <p>Min length: 4, Max Length: 10</p>
                        <label htmlFor="username">Username: </label>
                        <input required minLength="4" type="text" id="username" onChange={(event) => setUsername(event.target.value)} />
                        <label htmlFor="username">Password: </label>
                        <input required minLength="4" type="text" id="password" onChange={(event) => setPasword(event.target.value)} />
                        <button onClick={handleStart}>Start Game</button>
                        <p>{message}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default GameIntroUnit;
