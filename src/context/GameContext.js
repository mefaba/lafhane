import React, { useState } from "react";
import axios from "axios";

export const GameContext = React.createContext();

const GameProvider = (props) => {


    const fetch_data = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/`)
            return res

        } catch (err) {
            console.log("GameContext>FetchData"+err)
        }
    }

	return (
		<GameContext.Provider value={fetch_data}>
			{props.children}
		</GameContext.Provider>
	);
};

export default GameProvider;