import React from "react";
import {useContext} from "react";
import { useGameStore } from "../../context/GameContext";
import {useState} from "react";

import "./GameIntro.scss";
import LottieLoading from "./LottieLoading.js";
import {GAMEVIEW} from "../../constants/game.js";
import {api_register} from "../../api/api_calls.js";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png"

function Register() {
    const navigate = useNavigate();
    const {username, setUsername, setGameView} = useGameStore();
    const [password, setPasword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        if (username.length > 3 && username.length < 11) {
            //check if username exists in database.
            api_register(username.toLowerCase(), password).then((response) => {
                    if (response) {
                        // Delay the view change to playView by 1 second if login is successful
                        setTimeout(() => navigate("/game"), 1000);
                        
                    }
                })
                .catch((error) => {
                    setUsername("");
                    setPasword("");
                    setMessage("Invalid Credentials")
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
                        <img src={icon} alt="Lafhane Logo"  />
                        <p>Your username should be between 4 and 10 characters long.</p>
                        <label htmlFor="username">Username: </label>
                        <input required minLength="4" type="text" id="username" onChange={(event) => setUsername(event.target.value)} />
                        <label htmlFor="password">New Password: </label>
                        <input required minLength="4" type="text" id="password" onChange={(event) => setPasword(event.target.value)} />
                        <p>{message}</p>
                        <button className="button-63" onClick={handleStart}>Register</button>
                        <div style={{ borderTop: "1px solid #ccc", margin: "10px 0" }}></div>
                        {/* <p style={{ fontSize: "24px" }}>Already have an account?</p> */}
                        <button onClick={() => setGameView(GAMEVIEW.login)} className="button-63">BACK</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Register;
