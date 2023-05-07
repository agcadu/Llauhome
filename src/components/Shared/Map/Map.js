import React from "react";
import { View, Text, StyleSheet } from "react-native";
import  openMap from "react-native-open-maps";
import MapView, { Marker } from "react-native-maps";

export function Map(props) {
  const { location, name } = props;

  const openAppMap = () => {
    openMap({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      zoom: 19,
      query: name,
    });
  };
  
  return (
    <MapView
      style={styles.mapStyles}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        
        coordinate={location.coords}
        title="Mi ubicación"
        description="Arrastra para mover"
        onPress={openAppMap}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyles: {
    marginTop: 20,
    marginVertical: 20,
    justifyContent: "center",
    width: "100%",
    height: 200,
  },
});
