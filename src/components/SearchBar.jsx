import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SearchBar = (props) => {
  const { onEndEditing, didTouch, autoFocus = false, onTextChange } = props;
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <FontAwesome name="search" color="#998080" size={24} />
        <TextInput
          style={{ marginLeft: 5, flex: 9, fontSize: 20, height: 42 }}
          placeholder="Search Foods"
          autoFocus={autoFocus}
          onTouchStart={didTouch}
          onChangeText={(text) => onTextChange(text)}
          onEndEditing={onEndEditing}
        />
      </View>
    </View>
  );
};

export { SearchBar };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,

    backgroundColor: "white",
    margin: 10,
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
  },
  searchBar: {
    height: 32,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "#e5e5e5",
    border: "none",
  },
});
