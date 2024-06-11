import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import "./CountDown.scss";

const CountDownUnit = () => {
  const { remainingTime } = useContext(GameContext);
 
  const [ localRemainingTime, setLocalRemainingTime] = useState(0);
  const minutes = Math.floor(localRemainingTime / 60) || 0;
  const seconds = localRemainingTime % 60 || 0;
  let myInterval = null;

  useEffect(() => {
    if(myInterval) clearInterval(myInterval);
    setLocalRemainingTime(remainingTime);
    myInterval = setInterval(() => {
      setLocalRemainingTime((_localRemainingTime) => {
        if (_localRemainingTime > 0) {
          return _localRemainingTime - 1;
        } 
      });
    }, 1000);
    return () => clearInterval(myInterval);
    // eslint-disable-next-line
  }, [remainingTime]);

  return (
    <div className="countdown_container">
      {minutes}:{seconds < 10 ? `0${seconds }` : seconds}
    </div>
  );
};

export default CountDownUnit;
