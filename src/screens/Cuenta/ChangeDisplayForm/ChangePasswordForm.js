import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangePasswordFormdata";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

export function ChangePasswordForm(props) {
  const { onClose } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onValidateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const currentUser = getAuth().currentUser;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          formData.password
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, formData.newPassword);

        onClose();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "buttom",
          text1: "Error al actualizar la contraseña",
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <Input
        placeholder="Contraseña Actual"
        style={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Nueva Contraseña"
        style={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Repetir Contraseña"
        style={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
        errorMessage={formik.errors.repeatNewPassword}
      />
      <Button
        title="Cambiar nueva Contraseña"
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
});
