import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import CustomButton from "../components/CustomButton";
import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";

interface Props {
  userChoice: number;
  onRestart: () => void;
  onGameIsOver: () => void;
}

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen: React.FC<Props> = ({
  userChoice,
  onRestart,
  onGameIsOver,
}) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (userChoice === currentGuess) {
      onGameIsOver();
    }
  }, [userChoice, currentGuess]);

  const nextGuessHandler = (direction: "lower" | "greater") => {
    let newRand: number;

    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
      newRand = generateRandomBetween(minBoundary, currentGuess, currentGuess);
    } else {
      minBoundary = currentGuess + 1;
      newRand = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    }

    setCurrentGuess(newRand);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text style={styles.instructionText}>Higher or Lower?</Text>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
              -
            </CustomButton>
          </View>
          <View style={styles.button}>
            <CustomButton onPress={nextGuessHandler.bind(this, "greater")}>
              +
            </CustomButton>
          </View>
        </View>
      </View>
      {/* <View></View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    paddingVertical: 48,
    paddingHorizontal: 34,
  },
  instructionText: {
    padding: 10,

    fontSize: 22,

    color: "white",

    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
