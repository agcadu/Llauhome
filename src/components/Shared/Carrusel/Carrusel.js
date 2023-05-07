import React, {useState} from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native-elements";
import CarouselSnap, {Pagination} from "react-native-snap-carousel";
import { size} from "lodash"

export function Carrusel(props) {
  const { arrayImages, width, height, hideDots } = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ width, height }} />
  );

  const pagination = () => {
    return (
        <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.containerPagination}
        dotStyle={styles.dotStyle}
        />  
    );
    };
            

  return (
    <View style={styles.container}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />

        {!hideDots && pagination()}
    </View>
  );
}

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 300,
  },
    containerPagination: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 50,
        paddingBottom: 0,

    },
    dotStyle: {
        backgroundColor: "orange",
    },
});
