import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SearchBar, ListItem, Avatar, Icon } from "react-native-elements";
import { Loading } from "../components/Shared/Loading/Loading";
import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { size } from "lodash";
import { screen } from "../utils/screenName";

export function Buscador({ navigation }) {
  const [search, setSearch] = useState(null);
  const [text, setText] = useState("");
  console.log(size(search));

  useEffect(() => {
    const q = query(
      collection(db, "vendedores"),
      orderBy("product"),
      where("product", ">=", text),
      where("product", "<=", text + "\uf8ff"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
          // Agregar una nueva propiedad "searchableProduct" para hacer la búsqueda no sensible a mayúsculas y minúsculas
          searchableProduct: docData.product.toLowerCase(),
        };
      });
      setSearch(data);
    });

    // Si la búsqueda cambia, desuscribirse del snapshot anterior y suscribirse al nuevo
    return () => unsubscribe();
  }, [text]);

  const goToScreen = (id) => {
    navigation.navigate(screen.vendedor.tab, {
      screen: screen.vendedor.producto,
      params: { id },
    });
  };

  return (
    <>
      <SearchBar
        placeholder="Busca tu producto..."
        onChangeText={(e) => setText(e)}
        value={text}
        style={styles.searchBar}
      />
      {!search && <Loading show text="Cargando" />}
      {search && (
        <ScrollView>
          {search.map((producto) => (
            <ListItem
              key={producto.id}
              bottomDivider
              onPress={() => goToScreen(producto.id)}
            >
              <Avatar source={{ uri: producto.images[0] }} style={styles.img} />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  {producto.product}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.desc}>
                  {producto.description}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.price}>
                  {producto.price}€
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  desc: {
    fontSize: 15,
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
  },
});
