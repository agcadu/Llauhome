import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Toast } from "react-native-toast-message";
import { Modal } from "../../Shared/LoadingModal/Modal";
import { Button } from "react-native-elements";

export function MapForm(props) {
  const { show, close, formik } = props;
  const [location, setLocation] = useState({
    coords: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  });

  //Obtener la localizacion actual del vendedor y guardarla en el estado de la localizacion
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "buttom",
          text1: "Tienes que aceptar los permisos de localización",
        });
        return;
      }
      const locationActual = await Location.getCurrentPositionAsync({});

      setLocation(locationActual);
    })();
  }, []);

  //Guardar la localizacion en el formulario y cerrar el modal de la localizacion actual del vendedor
  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <MapView
        style={styles.mapStyles}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={(locationTemp) => setLocation({ coords: locationTemp })}
      >
        <Marker
          draggable
          coordinate={location.coords}
          title="Mi ubicación"
          description="Arrastra para mover"
        />
      </MapView>
      <View style={styles.mapButtons}>
        <Button
          title="Guardar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={saveLocation}
        ></Button>
        <Button
          title="Cerrar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={close}
        ></Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mapStyles: {
    marginTop: 20,
    marginVertical: 20,
    justifyContent: "center",
    width: 350,
    height: 300,
  },
  mapButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  btnContainer: {
    width: "45%",
  },
  btn: {
    backgroundColor: "orange",
    borderRadius: 10,
  },
});
