import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants/constants";
import { useDispatch } from "react-redux";

import { addToCart, decreaseCart } from "../redux/reducers/UserSlice";

const ButtonAddRemove = ({ onAdd, item, unit }) => {
  const dispatch = useDispatch();
  if (unit > 0) {
    return (
      <View style={styles.optionsView}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnPlusMinus}
          onPress={() => {
            dispatch(decreaseCart(item));
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "700", color: COLORS.primary }}
          >
            -
          </Text>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 5 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "700", color: COLORS.primary }}
          >
            {unit}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnPlusMinus}
          onPress={() => {
            dispatch(addToCart(item));
          }}
        >
          <Text
            style={{ fontSize: 18, color: COLORS.primary, fontWeight: "700" }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={styles.btn} onPress={() => onAdd()}>
        <Text style={{ fontSize: 18, color: "#fff" }}>Add</Text>
      </TouchableOpacity>
    );
  }
};

export { ButtonAddRemove };

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#f15b5b",
  },
  optionsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnPlusMinus: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,

    borderRadius: 10,
    width: 48,
    height: 38,
  },
});
