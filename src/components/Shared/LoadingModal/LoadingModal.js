import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Overlay, Text } from "react-native-elements";

export function LoadingModal(props) {
  const { show, text } = props;
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color="orange" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingModal.defaultProps = {
  show: false,
  text: "Cargando...",
};
const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "orange",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
