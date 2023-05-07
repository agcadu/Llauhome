import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../components/Shared/LoadingModal/LoadingModal";
import { ListVendedores } from "../../components/Vendedor/AddVendedor/ListVendedores";
import { screen, db } from "../../utils";

export function Vendedores() {
  const navigation = useNavigation();
  const [userCurrent, setUserCurrent] = useState(null);
  const [vendedores, setVendedores] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUserCurrent(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "vendedores"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVendedores(docs);
    });
  }, []);

  const crearVendedor = () => {
    navigation.navigate(screen.vendedor.addVendedor);
  };

  return (
    <View style={styles.container}>
      {vendedores.length === 0 ? (
        <LoadingModal show text="Cargando vendedores" />
        
      ) : (
        <ListVendedores vendedores={vendedores} />
      )}
      {userCurrent && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="orange"
          containerStyle={[styles.btnContainer, { zIndex: 1 }]}
          onPress={crearVendedor}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginBottom: 10,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
