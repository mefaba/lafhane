import React, { useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { GameContext } from "../../context/GameContext";

const PointBadge = ({ totalPoint }) => {
  return (
    <View style={styles.pointContainer}>
      <Button disabled color="#FD101C" title={`Puan: ${totalPoint}`} />
    </View>
  );
};
export default PointBadge;

const styles = StyleSheet.create({
  pointContainer: {
    flex: 1,
  },
});
