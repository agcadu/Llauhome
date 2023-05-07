import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { Carrusel } from "../../components/Shared/Carrusel/Carrusel";
import { Loading } from "../../components/Shared/Loading/Loading";
import {Header} from "../../components/Vendedor/Header/Header"
import { Info } from "../../components/Vendedor/Info/Info";
import { BtnReviewForm } from "../../components/Vendedor/BtnReviewForm/BtnReviewForm";
import { Reviews } from "../../components/Vendedor/Reviews/Reviews";
import { db } from "../../utils/firebase";

const { width } = Dimensions.get("window");

export function VendedoresScreen(props) {
  const { route } = props;
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    
    onSnapshot(doc(db, "vendedores", route.params.id), (doc) => {  
      setProducto(doc.data());
       
      
    });
  }, [route.params.id]);

  if (!producto) {
    return <Loading show text="Cargando productos..." />;
  }
  return (
    <ScrollView style={styles.container}>
      <Carrusel arrayImages={producto.images} height={250} width={width} />
      <Header producto={producto} />
      <Info producto={producto} />
      <BtnReviewForm producto={producto} idProductos={route.params.id}/>
      <Reviews idProductos={route.params.id}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
