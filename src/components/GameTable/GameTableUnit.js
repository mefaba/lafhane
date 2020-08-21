import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./GameTable.scss";
import CountDownUnit from "../CountDown/CountDownUnit";
import ResultComponentUnit from "../ResultComponent/ResultComponentUnit";
import { GameContext } from "../../context/GameContext";
import { useContext } from "react";

const GameTableUnit = () => {
	//const data_tableChars = "irpnnsiletbfooie"
	//const data_validAnswers=["sit","bek","cet","asi","bet","met","dem","kem","ece","tek","eti","ket","tem","fit","bas","sif","bit","cem","ekme","beis","emek","deme","süet","düet","sabi","site","kete","keme","asit","beti","abis","emet","etek","sübek","tebaa","emcek","demek","metis","basit","sümek","demet","bitek","sabit","tekme","abece","sitem","ecet","sabite","isabet"]
    const [point, setPoint] = useState(0);
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [currentAnswer, setCurrentAnswer] = useState("");
	const [data_tableChars, setDatatableChars] = useState("");
	const [data_validAnswers, setValidAnswers] = useState("");
	const { currentStage, username } = useContext(GameContext);

    
	//Getting Server-side Data
	const fetch_game_data = async () => {
		await axios.get(`${process.env.REACT_APP_ACTIVESERVER}/api/gametable`).then((res) => {
			const response = res.data.currentData;
			const dataKeys = Object.keys(response); //returns list of keys, in our case there will be always one, so we take the first in next line
			setDatatableChars(dataKeys[0]);
			const dataValues = Object.values(response); //returns list of value, in our case there will be always one, so we take the first in next line
			setValidAnswers(dataValues[0]);

			//Clear Answers&Points for Next Turn
			setCorrectAnswers([]);
		});

		if (currentStage === "gameStage") {
			//console.log("puan sıfırlanmadan önce puanın: " + point);
			//console.log("puan sıfırlandı");
			setPoint(0);
		}
	};

    useEffect(()=>{
        if(currentStage === "resultStage"){
            //console.log("Result aşamasında ve backende gönderildi, puanın: " + point);
            axios.put(`${process.env.REACT_APP_ACTIVESERVER}/api/scores/${username}`, { "point": point });
        }
    // eslint-disable-next-line
    },[currentStage])
    

	/* useEffect(() => {
        fetch_game_data()
    }, [])  */

	useEffect(() => {
		const socket = io(`${process.env.REACT_APP_ACTIVESERVER}/`);
		socket.emit("join", { username });
		/* socket.on('LAF_API', (response)=>{
            console.log(response)
            const dataKeys = Object.keys(response);//returns list of keys, in our case there will be always one, so we take the first in next line
            setDatatableChars(dataKeys[0])
            const dataValues = Object.values(response);//returns list of value, in our case there will be always one, so we take the first in next line
            setValidAnswers(dataValues[0])
        }) */
        //axios.get(`http://localhost:5000/`).then(res=>setValidAnswers(res.data["irpnnsiletbfooie"]))
    
    // eslint-disable-next-line
	}, []);

	/* const sendPointToAPI = () => {
        axios.post(`http://localhost:5000/`)
    } */

	const handleChange = (e) => {
		setCurrentAnswer(e.target.value);
		/* console.log(currentAnswer) */
	};
	const handleAnswer = () => {
		/* console.log(currentAnswer) */
		if (
			data_validAnswers.includes(currentAnswer) &&
			!correctAnswers.includes(currentAnswer) &&
			currentStage === "gameStage"
		) {
			console.log("Puan eklendi.");
			setCorrectAnswers([...correctAnswers, currentAnswer]);
			setPoint(point + currentAnswer.length * 2 - 3); //Points calculates as follows => length,point = 3,3 / 4,5 / 5,7 / 6,9 / 7,11 / 8,13 / 9,15 / 10,17
			//sendPointToAPI() //send total point to backend
		}
		setCurrentAnswer("");
		/* setCorrectAnswers(e.target.value) */
	};
	return (
		<div className="game_container">
			<div className="game_container_inner">
				{data_tableChars.split("").map((char, index) => {
					return (
						<div key={index} className="game_chars">
							<p>{char}</p>
						</div>
					);
				})}
			</div>

			<div className="game_correct_answers">
				<CountDownUnit fetch_game_data={fetch_game_data} />
				<div> Puan: {point}</div>
				<ResultComponentUnit
					correctAnswers={correctAnswers}
					data_validAnswers={data_validAnswers}
				/>
			</div>

			<div className="game_input_answer">
				<input
					type="text"
					value={currentAnswer}
					onChange={handleChange}
					onKeyPress={(event) => (event.charCode === 13 ? handleAnswer() : null)}
				/>

				<button type="submit" onClick={handleAnswer}>
					Enter
				</button>
			</div>
		</div>
	);
};

export default GameTableUnit;


/* const fetch_total_point = (initialValue) => {
    const [value, setValue] = useState(initialValue) 

    useEffect(() => {
        
    }) 
    console.log("Result aşamasında, puanın: " + point);
    axios.put(`http://localhost:5000/api/scores/${username}`, { "point": point });
    return
}; */