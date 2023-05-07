import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native-elements";

export function ImageVendedor(props) {
  const { formik } = props;

  const imagePrincipal = formik.values.images[0];

  return (
    <View style={styles.container}>
      <Image style={styles.img}
      source={imagePrincipal ? { uri: imagePrincipal } : require("../../../../assets/img/OrangeNotLog.png")}
      />
    </View>
  );
}

const widthScreen = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  img: {
    height: 200,
    width: widthScreen,
  },
});
