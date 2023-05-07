import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { MapForm } from "./MapForm";

export function Form(props) {
  const { formik } = props;
  const [showMap, setShowMap] = useState(false);
  const onMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <View style={styles.container}>
        <Input
          placeholder="Producto"
          onChangeText={(text) => formik.setFieldValue("product", text)}
          errorMessage={formik.errors.product}
        />
        <Input
          placeholder="Precio"
          keyboardType="numeric"
          onChangeText={(text) => formik.setFieldValue("price", text)}
          rightIcon={{
            type: "material-community",
            name: "currency-eur",
            color: "#c2c2c2",            
          }}
          errorMessage={formik.errors.price}
        />
        <Input
          placeholder="Direccion"
          rightIcon={{
            type: "material-community",
            name: "google-maps",
            color: getColor(formik),
            onPress: onMap,
          }}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
        />
        <Input
          placeholder="Telefono"
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Descripcion"
          multiline={true}
          inputContainerStyle={styles.text}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />
      </View>
      <MapForm show={showMap} close={onMap} formik={formik} />
    </>
  );
}

//Funcion para cambiar el color del icono de google maps si no ha marcado la ubicacion
const getColor = (formik) => {
  if (formik.errors.location) return "red";
  if (formik.values.location) return "green";
  return "#c2c2c2";
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  text: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
});
