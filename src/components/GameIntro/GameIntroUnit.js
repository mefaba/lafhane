import React from 'react'
import "./GameIntro.scss"
import { useState } from 'react'

function GameIntroUnit({setIsStarted}) {
    const [username, setUsername] = useState("")
    const  sendUsernameToAPI = () =>{
        console.log("building")
        //axios.post(`http://localhost:5000/`) //then if response is positive setIsStarted => True / Else if negative ask new user name
    }
    const handleStart = () =>{
        if(username.length > 3 && username.length <11){
            sendUsernameToAPI() //check if username exists in database.
            setIsStarted(true)
        }else{

        }
        
        console.log(username)
        
    }


    return (
        <div className="gameintro_container">
            <h1>GAME INTRO</h1>
            <p>Min length: 4, Max Length: 10</p>
            <label htmlFor="username">Username: </label>
            <input
             required
             minLength="4"
             type="text" 
             id="username" 
             onChange={(event)=>setUsername(event.target.value)}
            />
            <br></br>
            <button onClick={handleStart}>Start Game</button>
        </div>
    )
}

export default GameIntroUnit
