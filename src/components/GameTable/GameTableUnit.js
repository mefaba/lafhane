import React, { useState } from "react";
import "./GameTable.scss";

const GameTableUnit = () => {
    const data_tableChars = "aedhaümksbecfite"
    const data_validAnswers=["sit","bek","cet","asi","bet","met","dem","kem","ece","tek","eti","ket","tem","fit","bas","sif","bit","cem","ekme","beis","emek","deme","süet","düet","sabi","site","kete","keme","asit","beti","abis","emet","etek","sübek","tebaa","emcek","demek","metis","basit","sümek","demet","bitek","sabit","tekme","abece","sitem","ecet","sabite","isabet"]
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [currentAnswer, setCurrentAnswer] = useState("")

    const handleChange = (e) => {
        setCurrentAnswer(e.target.value)
        /* console.log(currentAnswer) */
    }
    const handleAnswer = () => {
        console.log(currentAnswer)
        if(data_validAnswers.includes(currentAnswer)){
            console.log("Congrats")
            setCorrectAnswers([...correctAnswers,currentAnswer])
            setCurrentAnswer("")
        }
        /* setCorrectAnswers(e.target.value) */
    }
    return (
		<div className="game_container">
			<div className="game_container_inner">
                {
                    data_tableChars.split("").map((char,index)=>{
                        return<div key={index} className="game_chars">{char.toUpperCase()}</div>
                    })
                }
			</div>

            <div className="game_correct_answers">
                Answers
            {correctAnswers.length?correctAnswers.map((answer,index)=>(<div key={index}>{answer}</div>)):null}
            </div>

			<div className="game_input_answer">
                <input 
                    type="text" 
                    value={currentAnswer} 
                    onChange={handleChange}
                    onKeyPress = {(event)=>(event.charCode === 13)?handleAnswer():null}
                    />
                    
                <button type="submit" onClick={handleAnswer}>Enter</button>
			</div>
		</div>
	);
};

export default GameTableUnit;
