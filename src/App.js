import React, { useState } from "react";
import "./App.scss";
import NavbarUnit from "./components/NavbarUnit";
import GameTableUnit from "./components/GameTable/GameTableUnit";
import GameIntroUnit from "./components/GameIntro/GameIntroUnit";
import LeaderBoardUnit from "./components/LeaderBoard/LeaderBoardUnit";



function App() {
  const [isStarted, setIsStarted] = useState(false);//development true, production false

	return (
		<div className="App">
			<NavbarUnit />
      {isStarted 
      ? (<>
            <LeaderBoardUnit/>
            <GameTableUnit />
         </>     
        )
      : <GameIntroUnit setIsStarted = {setIsStarted} />}
		</div>
	);
}

export default App;
