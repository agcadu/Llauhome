import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text, Button } from "react-native-elements";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { LoadingModal } from "../../components/Shared/LoadingModal/LoadingModal";
import { Cuentaopciones } from "../Cuenta/Cuentaopciones";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";

export function UserLoginScreen() {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [image, setImage] = useState(photoURL);
  const [reload, setReload] = useState(false);

  const onReload = () => { 
    setReload((prevState) => !prevState);
  };

  // funcion para captar imagenes de la galeria
  const defaultAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    uploadImage(result.assets[0].uri);
  };

  // funcion para subir imagenes a firebase storage
  const uploadImage = async (uri) => {
    setLoading(true);
    setLoadingText("Subiendo imagen...");
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoURL(snapshot.metadata.fullPath);
    });
  };

  // funcion para actualizar la url de la imagen en firebase auth
  const updatePhotoURL = async (imagepath) => {
    const storage = getStorage();
    const storageRef = ref(storage, imagepath);

    const url = await getDownloadURL(storageRef);
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      photoURL: url,
    });
    setImage(url);
    setLoading(false);
  };

  // funcion para cerrar sesion
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.conainerUser}>
        <Avatar
          size="large"
          rounded
          icon={{ name: "user", type: "font-awesome" }}
          containerStyle={styles.avatar}
          source={photoURL ? { uri: image } : null}
        >
          <Avatar.Accessory size={30} onPress={defaultAvatar} />
        </Avatar>
        <View>
          <Text style={styles.text}>{displayName || "User"}</Text>
          <Text>{email || "Email"}</Text>
        </View>
      </View>
      <View style={styles.conainerOptions}>
        <Cuentaopciones onReload={onReload}/>
      </View>
      <View>
        <Button
          title={"Cerrar sesión"}
          buttonStyle={styles.btn}
          titleStyle={styles.btnStyle}
          onPress={logout}
        ></Button>
      </View>
      <LoadingModal show={loading} text={loadingText} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    backgroundColor: "orange",
    marginRight: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  conainerUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "orange",
    borderRadius: 10,
  },
  btnStyle: {
    color: "#fff",
    alignItems: "center",
  },
  conainerOptions: {
    marginTop: 20,
    width: "100%",
  },
});
