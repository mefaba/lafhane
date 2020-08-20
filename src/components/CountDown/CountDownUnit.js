import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import { GameContext } from '../../context/GameContext'

const CountDownUnit = ({fetch_game_data}) => {
    const {setCurrentStage}= useContext(GameContext)
    const [remainingTime, setRemainingTime] = useState(0)
    const minutes = Math.floor(remainingTime/60) || 0
    const seconds = remainingTime%60 || 0

    useEffect(()=>{
        const myInterval = setInterval(() => {
            setRemainingTime((remainingTime)=>{
                if(remainingTime > 0){
                    return remainingTime-1
                }else if(remainingTime===0){
                    axios.get(`http://localhost:5000/api/remainingtime`).then((response)=> {
                        if(response.data.currentStage==="gameStage"){
                            setCurrentStage(response.data.currentStage)
                            //trigger game fetch data
                            fetch_game_data()
                            setRemainingTime(response.data.gameTime)
                        }else if(response.data.currentStage==="resultStage"){
                            setCurrentStage(response.data.currentStage)
                            setRemainingTime(response.data.resultTime)
                            
                        }
                    })
                }
            });
          }, 1000);
    },[])

    

    return (
        <div>
            {/* {remainingTime}
            <br/> */}
            { minutes }:{ seconds < 10 ? `0${ seconds }` : seconds }
        </div>
    )
}

export default CountDownUnit
