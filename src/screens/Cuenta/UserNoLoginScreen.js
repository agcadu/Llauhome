import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils";

export function UserNoLoginScreen() {
  const navigation = useNavigation();

  const login = () => {
    navigation.navigate(screen.cuenta.login);
  };

  return (
    <ScrollView centerContent={true} style={styles.scroll}>
      <Image
        source={require("../../../assets/img/OrangeNotLog.png")}
        style={styles.image}
      />
      <Text style={styles.text}>USUARIO NO LOGUEADO</Text>
      <Text style={styles.description}>
        Puedes ver los productos de otros vendedores, pero no puedes publicar
        los tuyos sin loguearte.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          title="Ir al login"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={login}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: 30,
    marginTop: 40,
  },
  image: {
    marginLeft: 30,
    resizeMode: "contain",
    height: 300,
    width: "85%",
    marginBottom: 30,
    borderRadius: 300,
    alignContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    borderRadius: 10,
    backgroundColor: "orange",
  },
  btnContainer: {
    width: "70%",
  },
});
