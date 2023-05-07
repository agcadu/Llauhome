import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Image, Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { screen } from "../../utils";

export function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const RegisterUser = () => {
    navigation.navigate(screen.cuenta.register);
  };

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email incorrecto")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
          );
        navigation.navigate(screen.cuenta.cuenta);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al iniciar sesion",
          text2: "El email o la contraseña son incorrectos",
        });
        console.log(error);
      }
    },
  });
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.image}
      ></Image>
      <View style={styles.container}>
        <View>
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
            secureTextEntry={showPassword ? false : true}
            rightIcon={
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress={showPasswordHandler}
              />
            }
            onChangeText={(text) => formik.setFieldValue("password", text)}
            errorMessage={formik.errors.password}
          ></Input>
          <Button
            title="Iniciar sesion"
            buttonStyle={styles.btnContainer}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          ></Button>
        </View>
        <Text style={styles.text}>
          ¿No estas registrado?:{" "}
          <Text style={styles.btn} onPress={RegisterUser}>
            Registrarse
          </Text>
        </Text>
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
    marginTop: 40,
  },
  btn: {
    color: "orange",
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    marginTop: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "orange",
    borderRadius: 10,
  },
  icon: {
    color: "#c1c1c1",
  },
});
