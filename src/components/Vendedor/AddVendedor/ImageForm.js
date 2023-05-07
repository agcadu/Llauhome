import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { map, filter } from "lodash";
import { LoadingModal } from "../.././Shared/LoadingModal/LoadingModal";

export function ImageForm(props) {
  const { formik } = props;
  const [loading, setLoading] = useState(false);

  //Funcion para acceder a la galeria de imagenes del dispositivo
  const imagesGal = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setLoading(true);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const id = Date.now();
    const refStorage = ref(storage, `vendedores/${id}`);

    await uploadBytes(refStorage, blob).then((snapshot) => {
      console.log(snapshot);
      updatePhotoURL(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoURL = async (imagepath) => {
    const storage = getStorage();
    const storageRef = ref(storage, imagepath);
    const imageUrl = await getDownloadURL(storageRef);
    formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setLoading(false);
  };

  const RemoveImage = (image) => {
    Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro de eliminar la imagen?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => {
            formik.setFieldValue(
              "images",
              formik.values.images.filter((imageUrl) => imageUrl !== image)
            );
          },
        },  
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.icon}>
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          style={styles.icon}
          onPress={imagesGal}
        />
        </View>

        {map(formik.values.images, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imagesStyle}
            onPress={() => RemoveImage(image)}
          />
        ))}
      </ScrollView>

      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={loading} text="Subiendo imagen..." />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  icon: {
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#e3e3e3",
    width: 70,
    height: 70,
  },
  error: {
    marginHorizontal: 20,
    marginTop: 10,
    color: "red",
    fontSize: 15,
    paddingLeft: 6,
  },
  imagesStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
