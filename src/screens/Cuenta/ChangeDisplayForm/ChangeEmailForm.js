import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { initialValues, validationSchema } from "./ChangeEmailFormdata";

export function ChangeEmailForm(props) {
  const { onClose, onReload } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onValidateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const currentUser = getAuth().currentUser;
        const { email, password } = formData;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          formData.password
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updateEmail(currentUser, formData.email);
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "buttom",
          text1: "Error al actualizar el email",
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nuevo email"
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar email e introduzca contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "orange",
  },
  btnContainer: {
    width: "100%",
  },
});
