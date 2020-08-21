import React, { useEffect } from "react";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import axios from "axios";
import { useState } from "react";
import "./LeaderBoard.scss";

function LeaderBoardUnit() {
	const { currentStage } = useContext(GameContext);
	const [leaderboard, setLeaderboard] = useState([]);
    /* const [isFirstGame, setIsFirstGame] = useState(true) */
	useEffect(() => {
		//if (currentStage === "resultStage" || isFirstGame) {
            /* setIsFirstGame(false) */
			//axios get leaderboard
			axios.get(`${process.env.REACT_APP_ACTIVESERVER}/api/scores/leaderboard`).then((res) => {
				let data = res.data;
				setLeaderboard(data);
				//console.log(res.data);
				//console.log(leaderboard);
			});
        //}
    // eslint-disable-next-line
	}, [currentStage]);

	return (
		<div className="leaderboard_container">
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
		</div>
	);
}

export default LeaderBoardUnit;
