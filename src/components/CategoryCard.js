import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const CategoryCard = ({ item, onTap }) => {
  return (
    <View
      style={{
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
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => onTap(item)}
      >
        <Image
          source={{ uri: `${item?.icon}` }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 20,
            backgroundColor: "#eaeaea",
          }}
        />
        <Text
          style={{
            fontSize: 14,
            marginTop: 10,
            color: "#858585",
          }}
        >
          {item?.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export { CategoryCard };

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});
