import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, Animated, View, TextInput, Button } from "react-native";
import { GameContext } from "../../context/GameContext";

const AnswerBadge = () => {
  const { badgeView } = useContext(GameContext);
  //console.log("badgeView:", badgeView);
  const { answer, answerStatus, view } = badgeView;
  //console.log("answer in answerbadge:", answer);
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("useffect in answerbadge:", answer);
    fadeIn();
  }, [answer]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => fadeOut());
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  if (view === "hidden") {
    return <View style={styles.answerContainer}></View>;
  }
  if (answerStatus === true) {
    return (
      <Animated.View style={[styles.trueAnswer, { opacity: fadeValue }]}>
        <Button color="#5CED0F" title={answer} onPress={fadeIn} />
      </Animated.View>
    );
  } else if (answerStatus === false) {
    return (
      <Animated.View style={{ opacity: fadeValue }}>
        <Button disabled color="#FD101C" title={"answered"} />
      </Animated.View>
    );
  }
};
export default AnswerBadge;

const styles = StyleSheet.create({
  answerContainer: {
    flex: 1,
  },
  trueAnswer: {
    flex: 1,
  },
  falseAnswer: {
    backgroundColor: "pink",
  },
});
