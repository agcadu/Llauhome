import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

export function Modal(props) {
  const { show, children, close } = props;

  return (
    <Overlay
      isVisible={show}
      overlayStyle={StyleSheet.overlay}
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    
  },
});
