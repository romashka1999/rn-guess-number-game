import { StyleSheet, Text, View } from "react-native";
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
      <View style={styles.buttonContainer}>
        <CustomButton onPress={onRestart}>Restart Game</CustomButton>
      </View>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  root: {
    marginTop: 100,
    paddingHorizontal: 38,
  },
  buttonContainer: {
    marginTop: 30,
  },
});
