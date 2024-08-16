import React from "react";
import {useContext} from "react";
import useGameStore from "../../context/GameContext.js";
import {useState} from "react";
import "./GameIntro.scss";
import LottieLoading from "./LottieLoading.js";
import {GAMEVIEW} from "../../constants/game.js";
import {api_login} from "../../api/api_calls.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate  = useNavigate();
    const {username, setUsername, setGameView} = useGameStore();
    const [password, setPasword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        if (username.length > 3 && username.length <= 10) {
            //check if username exists in database.
            api_login(username, password).then((response) => {
                    console.log("🚀 ~ login ~ response:", response);
                    if (response) {
                        // Delay the view change to playView by 1 second if login is successful
                        setTimeout(() => navigate("/game"), 1000);
                    }
                })
                .catch((error) => {
                    console.log("Error:", error);
                    setUsername("");
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

                        <label htmlFor="password">Password: </label>
                        <input required minLength="4" type="text" id="password" onChange={(event) => setPasword(event.target.value)} />
                        <p>{message}</p>
                        <button className="button-63" onClick={handleStart}>PLAY</button>
                        <p>OR</p>
                        <button onClick={() => setGameView(GAMEVIEW.register)} className="button-63">Register</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Login;
