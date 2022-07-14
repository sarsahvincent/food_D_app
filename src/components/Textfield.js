import { StyleSheet, TextInput, Dimensions, View } from "react-native";
import React from "react";

const Textfield = ({
  type = "default",
  placeholder,
  inSecure = false,
  onTextChange,
  isOTP = false,
}) => {
  if (isOTP) {
    return (
      <View style={styles.container}>
        <TextInput
          maxLength={6}
          keyboardType={type}
          placeholder={placeholder}
          secureTextEntry={inSecure}
          onChangeText={onTextChange}
          autocapitalize="none"
          style={styles.textFieldOTP}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          keyboardType={type}
          placeholder={placeholder}
          secureTextEntry={inSecure}
          onChangeText={onTextChange}
          autocapitalize="none"
          style={styles.textField}
        />
      </View>
    );
  }
};

export { Textfield };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d9d9d9",
    width:
      Dimensions.get("screen").width - Dimensions.get("screen").width * 0.1,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingRight: 10,
    paddingLeft: 20,
  },

  textField: {
    width: 300,
    flex: 1,
    height: 50,
    fontSize: 20,
    color: "#000",
  },
  textFieldOTP: {
    flex: 1,
    fontWeight: "700",
    height: 50,
    fontSize: 24,
    color: "#000",
  },
});
