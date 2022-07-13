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

const FoodCard = ({ item, onTap, onUpdateCart }) => {
  const didUpdateCart = (unit) => {
    item.unit = unit;
    onUpdateCart(item);
  };
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
        <View style={{ flex: 1, padding: 10 }}>
          <Text>{item?.name}</Text>
          <Text>{item?.category}</Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: "space-around",
            alignItems: "center",
            marginRight: 5,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#7c7c7c" }}>
            ${isNaN(item?.unit) ? item?.price : item.price * item?.unit}
          </Text>
          <ButtonAddRemove
            item={item}
            onAdd={() => {
              let unit = isNaN(item?.unit) ? 0 : item?.unit;
              didUpdateCart(unit + 1);
            }}
            onRemove={() => {
              let unit = isNaN(item?.unit) ? 0 : item?.unit;
              didUpdateCart(unit > 0 ? unit - 1 : unit);
            }}
            unit={item?.unit}
          />
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
    width:
      Dimensions.get("screen").width - Dimensions.get("screen").width * 0.1,
    margin: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    height: 100,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
});
