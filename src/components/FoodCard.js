import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { ButtonAddRemove } from "./ButtonAddRemove";

const FoodCard = ({ item, onTap }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTap(item)}
        style={{ flex: 1, flexDirection: "row" }}
      >
        <Image
          source={{ uri: `${item?.images[0]}` }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "#eaeaea",
          }}
        />
        <View style={{ flex: 8, padding: 10 }}>
          <Text>{item?.name}</Text>
          <Text>{item?.category}</Text>
        </View>
        <View
          style={{
            flex: 4,
            padding: 10,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: "600", color: "#7c7c7c" }}>
            {item?.price}
          </Text>
          <ButtonAddRemove onTap={() => {}} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { FoodCard };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    width: Dimensions.get("screen").width - 20,
    margin: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    height: 100,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
});
