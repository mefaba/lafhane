import React from "react";

import axios from "axios";
import {useContext} from "react";
import {GameContext} from "../../context/GameContext";
import {useState} from "react";

import "./GameIntro.scss";
import LottieLoading from "./LottieLoading.js";
//import Slideshow from "./Slideshow";
import Accordion from "./Accordion";

function GameIntroUnit({setIsStarted}) {
    const {username, setUsername} = useContext(GameContext);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendUsernameToAPI = () => {
        axios
            .post(`${process.env.REACT_APP_ACTIVESERVER}/api/login`, {
                username: username,
            })
            .then(({data}) => {
                //then if response is true setIsStarted => True / Else if negative ask new user name
                if (data) {
                    setIsStarted(false);
                    setTimeout(() => {
                        //Giriş başarısız olsa dahi 3 saniye sonra loading ekranı gitsin
                        setIsLoading(false);
                    }, 3000);
                } else {
                    setIsStarted(true);
                }
                /* setIsStarted(true) */
            });
    };
    const handleStart = () => {
        if (username.length > 3 && username.length < 11) {
            //check if username exists in database.
            sendUsernameToAPI();
            setIsLoading(true);
            setMessage("Hoşgeldiniz yada Tekrar Deneyin. Bu isimde bir kullanıcı zaten oyunda olabilir. Farklı bir isim deneyin.");
        }

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
                        <br></br>
                        <button onClick={handleStart}>Start Game</button>

                        <p>{message}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default GameIntroUnit;
