import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const ButtonAddRemove = ({ onTap }) => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Text style={{ fontSize: 18, color: "#fff" }}>Add</Text>
    </TouchableOpacity>
  );
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
});
