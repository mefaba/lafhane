import React, { useEffect } from "react";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import axios from "axios";
import { useState } from "react";
import "./LeaderBoard.scss";

function LeaderBoardUnit() {
	const { currentStage, display } = useContext(GameContext);
	const [leaderboard, setLeaderboard] = useState([]);
	/* const [isFirstGame, setIsFirstGame] = useState(true) */

	useEffect(() => {
		//if (currentStage === "resultStage" || isFirstGame) {
		/* setIsFirstGame(false) */
		//axios get leaderboard
		//console.log("leaderboard1");

		const fetch_leaderboard = () => {
			axios.get(`${process.env.REACT_APP_ACTIVESERVER}/api/scores/leaderboard`).then((res) => {
				let data = res.data;
				setLeaderboard(data);
				//console.log(res.data);
				//console.log("leaderboard2");
			});
		};

		const timer = setTimeout(() => {
			fetch_leaderboard();
			//console.log('This will run after 1 second!')
		}, 1000);

		return () => clearTimeout(timer);

		//}
		// eslint-disable-next-line
	}, [currentStage]);

	return (
		<div className="leaderboard" style={display ? {display:"block"}:{display: "none"}}>
			<h1>
				<svg>Icon</svg>
				En İyiler
			</h1>
			<ol>
				{leaderboard.map((x, index) => {
					return (
						<li key={index}>
							<mark>{x.username}</mark>
							<small>{x.score}</small>
						</li>
					);
				})}
			</ol>
		</div>
	);
}

export default LeaderBoardUnit;

/*  
        <div className="leaderboard">
        <h1>
            <svg>Icon</svg>
            Most active Players
        </h1>
        <ol>
            {leaderboard.map((x, index) => {
                return (
                    <li key={index}>
                        <mark>{x.username}</mark>
                        <small>{x.score}</small>
                    </li>
                );
            })}
        </ol>
    </div> */

/*     <div className="leaderboard_container">
    <p>En iyiler</p>
    <div className="leaderboard_container_inner">
        <div className="leaderboard_rows">
            <p>Oyuncu</p>
            <p>Puan</p>
        </div>
        {leaderboard.map((x, index) => {
            return (
                <div className="leaderboard_rows" key={index}>
                    <p>{x.username} </p>
                    <p>{x.score}</p>
                </div>
            );
        })}
    </div>
</div> */
