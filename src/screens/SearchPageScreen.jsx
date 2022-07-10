import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SearchPageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}></View>
      <View style={styles.footer}></View>
    </View>
  );
};

export default SearchPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  navigation: {
    flex: 2,
    backgroundColor: "red",
  },
  body: {
    flex: 10,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "cyan",
  },
});
