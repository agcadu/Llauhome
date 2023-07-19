import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { map } from "lodash";
import { RankingC } from "../components/Vendedor/Ranking/RankingC";

export function Ranking(props) {
  const [productos, setProductos] = useState(null);  
  const { route } = props;

  useEffect(() => {
    const q = query(
      collection(db, "vendedores"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }; 
      });
      setProductos(data);
    });
  }, []);

  return (
    <ScrollView>
      {map(productos, (producto, index) => (
        <RankingC key={index} index={index} producto={producto} route={route} />
      ))}
    </ScrollView>
  );
}
