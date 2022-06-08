import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>();
  const [gameIsOver, setGameIsOver] = useState<boolean>(true);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
    setGameIsOver(false);
  };

  const restartGameHandler = () => {
    setUserNumber(null);
  };

  const gameOverHandler = () => {
    setGameIsOver(true);
  };

  let screen = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen
        userChoice={userNumber}
        onRestart={restartGameHandler}
        onGameIsOver={gameOverHandler}
      />
    );
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen onRestart={restartGameHandler} />;
  }

  return (
    <LinearGradient
      colors={["yellow", "red", "blue", "yellow"]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.4,
  },
});
