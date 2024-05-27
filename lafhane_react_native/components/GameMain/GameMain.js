import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import axios from "axios";
import { fetch_total_point } from "../../api";
import { GameContext } from "../../context/GameContext";
import { getChunks } from "../../utils/functions";
import io from "socket.io-client";
import styles from "./style";
import CountDown from "./../CountDown/CountDown";
import AnswerBadge from "../Badges/AnswerBadge";
import PointBadge from "../Badges/PointBadge";

const GameMain = () => {
  const mock_data_tableChars = "irpnnsiletbfooie";

  const mock_data_validAnswers = [
    "sit",
    "bek",
    "cet",
    "asi",
    "bet",
    "met",
    "dem",
    "kem",
    "ece",
    "tek",
    "eti",
    "ket",
    "tem",
    "fit",
    "bas",
    "sif",
    "bit",
    "cem",
    "ekme",
    "beis",
    "emek",
    "deme",
    "süet",
    "düet",
    "sabi",
    "site",
    "kete",
    "keme",
    "asit",
    "beti",
    "abis",
    "emet",
    "etek",
    "sübek",
    "tebaa",
    "emcek",
    "demek",
    "metis",
    "basit",
    "sümek",
    "demet",
    "bitek",
    "sabit",
    "tekme",
    "abece",
    "sitem",
    "ecet",
    "sabite",
    "isabet",
  ];
  const [point, setPoint] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [data_tableChars, setDatatableChars] = useState(mock_data_tableChars);
  const [data_validAnswers, setValidAnswers] = useState(mock_data_validAnswers);
  const {
    currentStage,
    username,
    display,
    setDisplay,
    badgeView,
    triggerBadge,
  } = useContext(GameContext);

  const [rowOne, rowTwo, rowThree, rowFour] = getChunks(
    data_tableChars.split(""),
    4
  );

  const fetch_game_data = async () => {
    await axios
      .get(`https://lafhane-server.herokuapp.com/api/gametable`)
      .then((res) => {
        const response = res.data.currentData;
        const dataKeys = Object.keys(response); //returns list of keys, in our case there will be always one, so we take the first in next line
        setDatatableChars(dataKeys[0]);
        const dataValues = Object.values(response); //returns list of value, in our case there will be always one, so we take the first in next line
        setValidAnswers(dataValues[0]);

        //Clear Answers&Points for Next Turn
        setCorrectAnswers([]);
      })
      .catch((err) => console.log("fetch_game_data", err));

    if (currentStage === "gameStage") {
      //console.log("puan sıfırlanmadan önce puanın: " + point);
      //console.log("puan sıfırlandı");
      setPoint(0);
    }
  };

  useEffect(() => {
    if (currentStage === "resultStage") {
      //console.log("Result aşamasında ve backende gönderildi, puanın: " + point);
      fetch_total_point(point, username);
    } else if (currentStage === "gameStage") {
      fetch_game_data();
    }
    // eslint-disable-next-line
  }, [currentStage]);

  useEffect(() => {
    const socket = io(`https://lafhane-server.herokuapp.com/`);
    socket.emit("join", { username });
  }, []);

  const handleAnswer = () => {
    if (
      data_validAnswers.includes(currentAnswer) &&
      !correctAnswers.includes(currentAnswer) &&
      currentStage === "gameStage"
    ) {
      setCorrectAnswers([...correctAnswers, currentAnswer]);
      setPoint(point + currentAnswer.length * 2 - 3); //Points calculates as follows => length,point = 3,3 / 4,5 / 5,7 / 6,9 / 7,11 / 8,13 / 9,15 / 10,17

      triggerBadge("SHOW_TRUE_ANSWER", currentAnswer);
    } else {
      //trigger false answer
    }
    setCurrentAnswer("");
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Lafhane</Text>
      </View>
      <View style={styles.informationContainer}>
        <PointBadge totalPoint={point} />
        <CountDown />
        <AnswerBadge />
      </View>

      {/* GAMETABLE START */}
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          {rowOne.map((char, index) => (
            <TouchableOpacity
              onPress={() => setCurrentAnswer(currentAnswer + char)}
              key={index}
              style={styles.character}
            >
              <Text style={styles.charText}>{char}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tableRow}>
          {rowTwo.map((char, index) => (
            <TouchableOpacity
              onPress={() => setCurrentAnswer(currentAnswer + char)}
              key={index}
              style={styles.character}
            >
              <Text style={styles.charText}>{char}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tableRow}>
          {rowThree.map((char, index) => (
            <TouchableOpacity
              onPress={() => setCurrentAnswer(currentAnswer + char)}
              key={index}
              style={styles.character}
            >
              <Text style={styles.charText}>{char}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tableRow}>
          {rowFour.map((char, index) => (
            <TouchableOpacity
              onPress={() => setCurrentAnswer(currentAnswer + char)}
              key={index}
              style={styles.character}
            >
              <Text style={styles.charText}>{char}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* GAMETABLE END */}

      <View style={styles.answerContainer}>
        <TextInput editable={false} style={styles.answer}>
          {currentAnswer}
        </TextInput>
      </View>

      <View>
        <Button title="submit" onPress={handleAnswer} />
      </View>
    </View>
  );
};

export default GameMain;
