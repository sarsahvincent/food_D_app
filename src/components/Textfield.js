import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Textfield = ({ placeholder, inSecure = false, onTextChange }) => {
  return (
    <View style={styles.container}>
      <Text
        placeholder={placeholder}
        secureTextEntry={inSecure}
        onChangeText={onTextChange}
        autocapitalize="none"
        style={styles.textField}
      >
        Textfield
      </Text>
    </View>
  );
};

export { Textfield };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingRight: 10,
    paddingLeft: 20,
  },
  textField: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: "#000",
  },
});
