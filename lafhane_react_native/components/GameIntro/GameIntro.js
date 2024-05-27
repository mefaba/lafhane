import React, { useContext } from "react";
import axios from "axios";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { GameContext } from "../../context/GameContext";

const GameIntro = (props) => {
  const { setIsStarted } = props;
  const { username, setUsername } = useContext(GameContext);
  //const [message, setMessage] = useState("");
  //const [isLoading, setIsLoading] = useState(false);

  const sendUsernameToAPI = () => {
    axios
      .post(`https://lafhane-server.herokuapp.com/api/users`, {
        username: username,
      })
      .then(({ data }) => {
        //then if response is true setIsStarted => True / Else if negative ask new user name
        if (data) {
          setIsStarted(false);
          setTimeout(() => {
            //Giriş başarısız olsa dahi 3 saniye sonra loading ekranı gitsin
            setIsLoading(false);
          }, 3000);
        } else {
          setIsStarted(true);
        }
        /* setIsStarted(true) */
      })
      .catch((err) => console.log("sendUsernameToAPI", err));
  };

  const handleStart = () => {
    if (username.length > 3 && username.length < 11) {
      //check if username exists in database.
      sendUsernameToAPI();
      //setIsLoading(true);
      /* setMessage(
        "Hoşgeldiniz yada Tekrar Deneyin. Bu isimde bir kullanıcı zaten oyunda olabilir. Farklı bir isim deneyin."
      ); */
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lafhane</Text>
      <View>
        <Button onPress={handleStart} title="How to Play" color="#841584" />
      </View>
      <Text style={styles.title}>Min length: 4, Max Length: 10</Text>
      <Text style={styles.title}>Username:</Text>
      <TextInput
        style={{
          width: "100%",
          padding: 10,
          height: 40,
          borderColor: "grey",
          borderWidth: 1,
          textAlign: "center",
          marginVertical: 8,
        }}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <View style={styles.startButton}>
        <Button onPress={handleStart} title="Start Game" color="#841584" />
      </View>
    </View>
  );
};

export default GameIntro;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5590BD",
    width: "100%",
    height: "100%",
    padding: 10,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  startButton: {},
});
