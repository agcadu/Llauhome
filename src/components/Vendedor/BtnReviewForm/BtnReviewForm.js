import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen, db } from "../../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";

export function BtnReviewForm(props) {
  const { idProductos } = props;
  const [logged, setLogged] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const [review, setReview] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (logged) {
      const q = query(
        collection(db, "reviews"),
        where("idProductos", "==", idProductos),
        where("idUser", "==", auth.currentUser.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        if (size(querySnapshot.docs) > 0) {
          setReview(true);
        }
      });
    }
  }, [logged]);

  const goToLogin = () => {
    navigation.navigate(screen.cuenta.tab, { screen: screen.cuenta.login });
  };

  const goToReview = () => {
    navigation.navigate(screen.vendedor.addReview, { idProductos });
  };

  if (logged && review) {
    return (
      <View style={styles.container}>
        <Text style={styles.txtrw}>
          Ya has escrito una reseña para este producto.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {logged ? (
        <Button
          title="Escribir una opinión"
          buttonStyle={styles.btn}
          titleStyle={styles.txtbtn}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "orange",
          }}
          containerStyle={{ width: "95%", marginTop: 20 }}
          onPress={goToReview}
        />
      ) : (
        <Text style={styles.txt} onPress={goToLogin}>
          Para escribir una reseña tienes que estar{" "}
          <Text style={styles.txt2}>logueado.</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    textAlign: "center",
    color: "orange",
    padding: 20,
  },
  txt2: {
    color: "orange",
    fontWeight: "bold",
  },
  container: {
    margin: 15,
  },
  btn: {
    backgroundColor: "transparent",
  },
  txtbtn: {
    color: "orange",
    fontWeight: "bold",
  },
  txtrw: {
    textAlign: "center",
    color: "orange",
    padding: 20,
    fontWeight: "bold",
  },
});
