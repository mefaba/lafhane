import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useGameStore } from "../../context/GameContext";
import "./CountDown.scss";

const CountDownUnit = () => {
  const { remainingTime } = useGameStore();
 
  const [ localRemainingTime, setLocalRemainingTime] = useState(0);
  const minutes = Math.floor(localRemainingTime / 60) || 0;
  const seconds = localRemainingTime % 60 || 0;

  useEffect(() => {
    setLocalRemainingTime(remainingTime);
    // eslint-disable-next-line
  }, [remainingTime]);

    

  return (
    <div className="countdown_container">
      {minutes}:{seconds < 10 ? `0${seconds }` : seconds}
    </div>
  );
};

export default CountDownUnit;
