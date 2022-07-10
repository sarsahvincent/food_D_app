import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";

const screenWidth = Dimensions.get("screen").width;

const RestaurantCard = ({ item, onTap }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={() => onTap(item)}
    >
      <Image
        source={{ uri: `${item?.images[0]}` }}
        style={{
          width: screenWidth - 60,
          height: 220,
          borderRadius: 20,
          backgroundColor: "#eaeaea",
        }}
      />
    </TouchableOpacity>
  );
};

export { RestaurantCard };

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 60,
    height: 220,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
  },
});
