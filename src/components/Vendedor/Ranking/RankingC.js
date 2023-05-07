import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text, Rating } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

export function RankingC(props) {
  const { producto } = props;
  const navigation = useNavigation();

  //funcion fara navegar a la pantalla de producto
  const goToScreen = () => {
    navigation.navigate(screen.vendedor.tab, {
      screen: screen.vendedor.producto,
      params: { id: producto.id },
    });
  };

  return (
    <TouchableOpacity onPress={goToScreen}>
      <View style={styles.container}>
        <Image source={{ uri: producto.images[0] }} style={styles.img} />
        <View style={styles.info}>
          <Text style={styles.name}>{producto.product}</Text>
          <Text style={styles.price}>{producto.price}€</Text>
          <Rating
            imageSize={20}
            startingValue={producto.ratingMedia}
            readonly
            style={styles.rating}
          />
        </View>
        <Text style={styles.description}>{producto.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  img: {
    width: "100%",
    height: 100,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
    marginTop: 5,
  },
  rating: {
    marginTop: 5,
  },

  description: {
    paddingHorizontal: 10,

    color: "grey",
    textAlign: "justify",
  },
});
