import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

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
  const [guesses, setGuesses] = useState([initialGuess]);

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
      newRand = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    } else {
      minBoundary = currentGuess + 1;
      newRand = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    }

    setCurrentGuess(newRand);
    setGuesses((prev) => [newRand, ...prev]);
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
              <Ionicons name="md-remove" size={24} />
            </CustomButton>
          </View>
          <View style={styles.button}>
            <CustomButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} />
            </CustomButton>
          </View>
        </View>
      </View>
      <FlatList
        data={guesses}
        renderItem={(itemData) => (
          <View style={styles.listItem}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "open-sans-bold",
                fontSize: 18,
              }}
            >
              {itemData.item}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
      />
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
    marginVertical: 18,

    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  listItem: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "green",
  },
});
