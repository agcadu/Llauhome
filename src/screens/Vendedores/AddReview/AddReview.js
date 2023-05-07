import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { AirbnbRating, Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../utils/firebase";
import { initialValues, validationSchema } from "./AddReviewData";
import Toast from "react-native-toast-message";

export function AddReview({ route }) {
  const { idProductos } = route.params;
  const navigation = useNavigation();

  //funcion para enviar la review a la coleccion de reviews 
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const auth = getAuth();
        const idDoc = Date.now().toString();
        const newData = formData;
        newData.id = idDoc;
        newData.idProductos = idProductos;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateProduct();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al enviar review",
        });
      }
    },
  });

  //funcion para actualizar el rating del producto en la coleccion de vendedores cuando se envia una review nueva 
  const updateProduct = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idProductos", "==", idProductos)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const arrayStars = map(reviews, (review) => review.data().rating);

      const media = mean(arrayStars);

      const productRef = doc(db, "vendedores", idProductos);
      await updateDoc(productRef, {
        ratingMedia: media,
      });

      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.viewRating}>
          <AirbnbRating
            count={5}
            reviews={["Malo", "Regular", "Normal", "Muy Bueno", "Excelente"]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>

        <View style={styles.formReview}>
          <Input
            placeholder="Titulo"
            containerStyle={styles.input}
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario..."
            multiline
            inputContainerStyle={styles.textArea}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />

          <Button
            title="Enviar opinión"
            buttonStyle={styles.btn}
            titleStyle={styles.txtbtn}
            icon={{
              type: "material-community",
              name: "square-edit-outline",
              color: "orange",
            }}
            containerStyle={{ width: "95%", marginTop: 20 }}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  viewRating: {
    height: 200,
    justifyContent: "center",
  },
  formReview: {
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btn: {
    backgroundColor: "transparent",
  },
  txtbtn: {
    color: "orange",
  },
});
