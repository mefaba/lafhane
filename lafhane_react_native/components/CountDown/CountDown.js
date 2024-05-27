import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { GameContext } from "../../context/GameContext";
import styles from "./style";

const CountDown = () => {
  const { setCurrentStage } = useContext(GameContext);
  const [remainingTime, setRemainingTime] = useState(0);
  const minutes = Math.floor(remainingTime / 60) || 0;
  const seconds = remainingTime % 60 || 0;

  useEffect(() => {
    const myInterval = setInterval(() => {
      setRemainingTime((remainingTime) => {
        if (remainingTime > 0) {
          return remainingTime - 1;
        } else if (remainingTime === 0) {
          axios
            .get(`https://lafhane-server.herokuapp.com/api/remainingtime`)
            .then((response) => {
              if (response.data.currentStage === "gameStage") {
                setCurrentStage(response.data.currentStage);
                //trigger game fetch data
                //fetch_game_data()
                setRemainingTime(response.data.gameTime);
              } else if (response.data.currentStage === "resultStage") {
                setCurrentStage(response.data.currentStage);
                setRemainingTime(response.data.resultTime);
              }
            })
            .catch((err) => console.log("CountDown", err));
        }
      });
    }, 1000);
    return () => clearInterval(myInterval);
    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownText}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
};

export default CountDown;
