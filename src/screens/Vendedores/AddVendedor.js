import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { Form } from "../../components/Vendedor/AddVendedor/Form";
import { ImageForm } from "../../components/Vendedor/AddVendedor/ImageForm";
import { ImageVendedor } from "../../components/Vendedor/AddVendedor/ImageVendedor";
import { db } from "../../utils/firebase";
import { useNavigation } from "@react-navigation/native";
import { initialValues, validationSchema } from "./AddVendedorData";
import { doc, setDoc } from "firebase/firestore";

export function AddVendedor() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const id = Date.now().toString();
        const newVendedorRef = doc(db, "vendedores", id);
        await setDoc(newVendedorRef, {
          ...values,
          createdAt: new Date(),
        });
        console.log("Document written with ID: ", newVendedorRef.id);
        navigation.goBack();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  });

  return (
    <ScrollView>
      <ImageVendedor formik={formik} />
      <Form formik={formik} />
      <ImageForm formik={formik} />
      <Button
        title="Guardar"
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "orange",
    margin: 10,
    borderRadius: 10,
  },
});
