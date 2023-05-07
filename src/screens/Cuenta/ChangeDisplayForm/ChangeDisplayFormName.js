import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { initialValues, validationSchema } from "./ChangeDisplayFormName.data";

export function ChangeDisplayFormName(props) {
  const { onClose, onReload } = props;

  // funccion para cambiar el nombre y apellidos
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { name } = formValue;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, { displayName: name });
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "buttom",
          text1: "Error al actualizar el nombre y apellidos",
        });
      }
    },
  });
  return (
    <View>
      <Input
        style={styles.input}
        placeholder="Nombre y apellidos"
        onChangeText={(text) => formik.setFieldValue("name", text)}
        errorMessage={formik.errors.name}
      ></Input>
      <Button
        title="Cambiar nombre y apellidos"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
  },
  input: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  btnContainer: {
    marginTop: 20,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "orange",
  },
});
