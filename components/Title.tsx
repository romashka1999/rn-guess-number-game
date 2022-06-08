import { StyleSheet, Text } from "react-native";
import React from "react";

interface Props {}

const Title: React.FC<Props> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    padding: 15,

    textAlign: "center",

    borderWidth: 3,
    borderColor: "black",

    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "black",
  },
});
