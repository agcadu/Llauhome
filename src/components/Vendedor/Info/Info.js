import React from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";
import { Map } from "../../Shared/Map/Map";
import openMap from "react-native-open-maps";
import { map } from "lodash";

export function Info(props) {
  const { producto } = props;
  

  const openAppMap = () => {
    openMap({
      latitude: producto.location.coords.latitude,
      longitude: producto.location.coords.longitude,
      zoom: 19,
      query: producto.product,
    });
  };

  const openMailApp = () => {
    Linking.openURL(`mailto:${producto.email}?subject=Asunto del correo`);
  };

  const listInfo = [
    {
      text: producto.address,
      iconName: "map-marker",
      iconType: "font-awesome",
      action: () => {
        openAppMap();
      },
    },
    {
      text: producto.phone,
      iconName: "phone",
      iconType: "font-awesome",
      action: () => {
        Linking.openURL(`whatsapp://send?phone=${"+34" + producto.phone}`);
      },
    },
    {
      text: producto.email,
      iconName: "at",
      iconType: "font-awesome",
      action: () => {
        openMailApp();
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informacion de contacto</Text>
      <Map location={producto.location} name={producto.product} />
      {map(listInfo, (item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={item.action}
        >
          <Icon
            type={item.iconType}
            name={item.iconName}
            color="#c1c1c1"
            style={styles.icon}
          />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});
