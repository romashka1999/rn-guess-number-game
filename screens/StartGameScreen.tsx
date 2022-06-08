import { StyleSheet, View, TextInput, Alert, Text } from "react-native";
import React, { useState } from "react";

import CustomButton from "../components/CustomButton";
import Title from "../components/Title";

interface Props {
  onStartGame: (selectedNumber: number) => void;
}

const StartGameScreen: React.FC<Props> = ({ onStartGame }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const resetHandler = () => {
    setEnteredNumber("");
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 2 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number has to be between 2 and 99", [
        {
          text: "Okay",
          style: "destructive",
          onPress: resetHandler,
        },
      ]);
      return;
    }
    onStartGame(chosenNumber);
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Guess my number</Title>
      <View style={styles.inputContainer}>
        <Text style={styles.instructionText}>Enter Number</Text>
        <TextInput
          style={styles.input}
          maxLength={2}
          keyboardType="number-pad"
          value={enteredNumber}
          onChangeText={(text) => setEnteredNumber(text)}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={resetHandler}>Reset</CustomButton>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={confirmHandler}>Confirm</CustomButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 30,
    marginHorizontal: 24,
    padding: 16,

    justifyContent: "center", // main axis (default is flexDirection: column)
    alignItems: "center", // cross axis

    borderRadius: 8,

    elevation: 4, // android only shadow
    // iOS only shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,

    backgroundColor: "#430329",
  },
  input: {
    height: 50,
    width: 50,

    marginVertical: 8,

    borderBottomWidth: 2,
    borderBottomColor: "#ddb52f",

    textAlign: "center",

    fontSize: 32,
    fontWeight: "bold",
    color: "#ddb52f",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    fontSize: 22,

    color: "white",
  },
});
