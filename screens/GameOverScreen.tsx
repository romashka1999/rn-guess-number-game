import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import Title from "../components/Title";

interface Props {
  onRestart: () => void;
}

const GameOverScreen: React.FC<Props> = ({ onRestart }) => {
  return (
    <View style={styles.root}>
      <Title>Game Over</Title>
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
          resizeMode={"cover"}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={onRestart}>Restart Game</CustomButton>
      </View>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 30,
    width: 300,
  },
  imgContainer: {
    width: 300,
    height: 300,

    margin: 36,

    borderRadius: 200,
    borderWidth: 3,
    borderColor: "black",

    overflow: "hidden",

    backgroundColor: "red",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
