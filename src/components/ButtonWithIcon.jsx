import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants/constants";

const ButtonWithIcon = ({ width, height, icon, onTap }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        margin: 5,
        padding: 10,
        borderRadius: 20,
        paddingVertical: 6,
        shadowColor: "#a7abbc",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 7,
      }}
    >
      <TouchableOpacity
        style={[styles.btn, { width, height }]}
        onPress={() => {
          onTap();
        }}
      >
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export { ButtonWithIcon };

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
});
