import React, { useState } from "react";
import "./App.scss";
import NavbarUnit from "./components/NavbarUnit";
import GameTableUnit from "./components/GameTable/GameTableUnit";
import GameIntroUnit from "./components/GameIntro/GameIntroUnit";

function App() {
	const [isStarted, setIsStarted] = useState(false);
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
