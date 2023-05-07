import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, ListItem, Avatar, AirbnbRating } from "react-native-elements";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { Loading } from "../../Shared/Loading/Loading";
import { db } from "../../../utils/firebase";
import { map } from "lodash";

export function Reviews(props) {
  const { idProductos } = props;
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idProductos", "==", idProductos)
    );

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, [idProductos]);

  if (reviews === null) {
    return <Loading show text="Cargando reseñas..." />;
  }
  return (
    <View style={StyleSheet.container}>
      {map(reviews, (review) => {
        return (
          <ListItem
            key={review.id}
            bottomDivider
            containerStyle={StyleSheet.review}
          >
            <Avatar
              source={{ uri: review.data().avatar }}
              size="large"
              rounded
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {review.data().title}
              </ListItem.Title>
              <View style={styles.comment}>
                <Text style={styles.commenttxt}>{review.data().comment}</Text>
                <View style={styles.rating}>
                  <AirbnbRating
                    defaultRating={review.data().rating}
                    showRating={false}
                    size={15}
                    isDisabled
                    starContainerStyle={styles.star}
                  />
                  <Text>{review.data().data}</Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  review: {
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
  },
  comment: {
    flexDirection: "column",
    marginTop: 5,
  },
  commenttxt: {
    paddingRight: 50,
  },
  rating: {
    flexDirection: "row",

    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },

  star: {
    height: 10,
    flex: 1,
    width: "100%",
  },
});
