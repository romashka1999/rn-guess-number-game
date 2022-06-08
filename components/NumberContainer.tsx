import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {}

const NumberContainer: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 24,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 4,
    borderColor: "yellow",
    borderRadius: 8,
  },
  text: {
    color: "yellow",
    fontSize: 36,
    fontWeight: "bold",
  },
});
