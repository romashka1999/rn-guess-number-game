import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PressableStateCallbackType,
  Platform,
} from "react-native";
import React from "react";

interface Props {
  onPress: () => void;
}

const CustomButton: React.FC<Props> = ({ children, onPress }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={(data: PressableStateCallbackType) =>
          data.pressed && Platform.OS === "ios"
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "red" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    margin: 4,

    borderRadius: 28,

    overflow: "hidden",
  },
  buttonInnerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,

    elevation: 2, // android only shadow

    backgroundColor: "#72063c",
  },
  buttonText: {
    textAlign: "center",

    color: "white",
  },
  pressed: {
    opacity: 0.75,
  },
});
