import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Image, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function ListVendedores(props) {
  const { vendedores } = props;
  const navigation = useNavigation();

  const goToProduct = (vendedor) => {
    navigation.navigate(screen.vendedor.producto, { id: vendedor.id });
  };

  return (
    <View>
      <FlatList
        data={vendedores}
        
        renderItem={(doc) => {
          const vendedor = doc.item;
          //console.log(vendedor);
          return (
            <TouchableOpacity onPress={() => goToProduct(vendedor)}>
              <View style={styles.vnd}>
                <Image source={{ uri: vendedor.images[0] }} style={styles.img} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{vendedor.product}</Text>
                  <Text style={styles.price}>{vendedor.price} €/Kg</Text>
                              
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        style={{ marginBottom: 40 }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  img: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  vnd: {
    flexDirection: "row",
    margin: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  description: {
    color: "grey",
    paddingRight: 100,
    marginTop: 3,   
    fontSize: 14,
    marginBottom: 5,
  },
  
});


