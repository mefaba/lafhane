import React, { useState, useContext } from "react";
import axios from "axios";

export const GameContext = React.createContext();

const GameProvider = (props) => {
    const [currentStage, setCurrentStage]= useState("gameStage") //gameStage & resultStage
    /* const [data_tableChars, setDatatableChars] = useState("")
    const [data_validAnswers, setValidAnswers] = useState("") */

    /* const fetch_game_data =  () => {

        axios.get(`http://localhost:5000/api/gametable`).then(res=>{
            const response = res.data.currentData
            const dataKeys = Object.keys(response);//returns list of keys, in our case there will be always one, so we take the first in next line
            setDatatableChars(dataKeys[0])
            const dataValues = Object.values(response);//returns list of value, in our case there will be always one, so we take the first in next line
            setValidAnswers(dataValues[0])
        })
       
    } */

	return (
		<GameContext.Provider value={{currentStage, setCurrentStage}}>
			{props.children}
		</GameContext.Provider>
	);
};

export default GameProvider;