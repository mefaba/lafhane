import React from "react";
import "./GameTable.scss";

const GameTableUnit = () => {
    const data_tableWords = "aedhaümksbecfite"
    const data_validAnswers=["sit","bek","cet","asi","bet","met","dem","kem","ece","tek","eti","ket","tem","fit","bas","sif","bit","cem","ekme","beis","emek","deme","süet","düet","sabi","site","kete","keme","asit","beti","abis","emet","etek","sübek","tebaa","emcek","demek","metis","basit","sümek","demet","bitek","sabit","tekme","abece","sitem","ecet","sabite","isabet"]
	//const tableData = ["A", "B", "C","D","E","F","G","Ğ","H","I","İ","J","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"]
    
    return (
		<div className="game_container">
			<div className="game_container_inner">
				<div className="game_chars">A</div>
				<div className="game_chars">B</div>
				<div className="game_chars">C</div>
				<div className="game_chars">D</div>
				<div className="game_chars">E</div>
				<div className="game_chars">F</div>
				<div className="game_chars">G</div>
				<div className="game_chars">H</div>
				<div className="game_chars">K</div>
				<div className="game_chars">O</div>
				<div className="game_chars">H</div>
				<div className="game_chars">K</div>
				<div className="game_chars">K</div>
				<div className="game_chars">O</div>
				<div className="game_chars">H</div>
				<div className="game_chars">K</div>
			</div>

			<div className="game_answer">
				<input type="text" />
                <button type="submit">Enter</button>
			</div>
		</div>
	);
};

export default GameTableUnit;
