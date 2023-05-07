import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { screen } from "../../utils";
import { Image, Button, Icon, Input } from "react-native-elements";

export function RegisterUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigation = useNavigation();

  //funcion para validar el formulario de registro de usuario con formik y yup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },

    //validacion de los campos del formulario
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email incorrecto")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
      repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
    }),
    validateOnChange: false,

    //funcion para crear el usuario en firebase con el email y la contraseña que se le pasa por parametro y si todo va bien nos redirige a la pantalla de login de usuario y si no nos muestra un mensaje de error con toast
    onSubmit: async (formData) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        navigation.navigate(screen.cuenta.cuenta);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al crear la cuenta",
          text2: "El email ya esta en uso",
        });
        console.log(error);
      }
    },
  });

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  const showRepeatPasswordHandler = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.image}
      ></Image>
      <View style={styles.container}>
        <View style={styles.form}>
          <Input
            placeholder="Correo electronico"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name="at"
                iconStyle={styles.icon}
              />
            }
            onChangeText={(text) => formik.setFieldValue("email", text)}
            errorMessage={formik.errors.email}
          ></Input>
          <Input
            placeholder="Contraseña"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress={showPasswordHandler}
              />
            }
            onChangeText={(text) => formik.setFieldValue("password", text)}
            secureTextEntry={showPassword ? false : true}
            errorMessage={formik.errors.password}
          ></Input>
          <Input
            placeholder="Repetir contraseña"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress={showRepeatPasswordHandler}
              />
            }
            onChangeText={(text) =>
              formik.setFieldValue("repeatPassword", text)
            }
            secureTextEntry={showRepeatPassword ? false : true}
            errorMessage={formik.errors.repeatPassword}
          ></Input>

          <Button
            title="Registrarse"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnStyle}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  container: {
    marginHorizontal: 40,
    marginTop: 10,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    marginTop: 10,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 10,
    width: "95%",
    marginEnd: 10,
    borderRadius: 10,
  },
  btnStyle: {
    backgroundColor: "orange",
  },
});
