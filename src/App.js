import React, { useState } from "react";
import "./App.scss";
import NavbarUnit from "./components/NavbarUnit";
import GameTableUnit from "./components/GameTable/GameTableUnit";
import GameIntroUnit from "./components/GameIntro/GameIntroUnit";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { GameContext } from "./context/GameContext";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const { username } = useContext(GameContext);

  useEffect(()=>{
    return () =>{
      axios.delete(`http://localhost:5000/api/users`,{"username": username })
  }
  })
	return (
		<div className="App">
			<NavbarUnit />
      {isStarted 
      ? <GameTableUnit /> 
      : <GameIntroUnit setIsStarted = {setIsStarted} />}
		</div>
	);
}

export default App;
