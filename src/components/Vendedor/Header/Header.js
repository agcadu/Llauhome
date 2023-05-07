import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Rating } from "react-native-elements";

export function Header(props) {
  const { producto } = props;
  

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.name}>{producto.product}</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={producto.ratingMedia | 0}
        />
      </View>
      <Text style={styles.price}>{producto.price} €/Kg</Text>
      <Text style={styles.description}>{producto.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    color: "grey",
  },
  price: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
});
