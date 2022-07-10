import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import { ButtonWithIcon, FoodCard } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/constants";

const FoodDetailsScreen = ({ route, navigation }) => {
  const { food } = route.params;

  console.log("food", food);

  const onTapFood = (item) => {
    navigation.navigate("FoodDetailsPage", { food: item });
  };

  const screenWidth = Dimensions.get("screen").width;

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <ButtonWithIcon
          icon={<Ionicons name="arrow-back" size={40} color={COLORS.white} />}
          onTap={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 22, fontWeight: "600", marginLeft: 80 }}>
          {food?.name}
        </Text>
      </View>
      <View style={styles.body}>
        <ImageBackground
          source={{ uri: `${food.images}` }}
          style={{
            width: screenWidth,
            height: 320,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              height: 120,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 30, fontWeight: "700" }}>
              {food.name}
            </Text>
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: "500" }}>
              {food.category}
            </Text>
          </View>
        </ImageBackground>

        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            height: "50%",
          }}
        >
          <View style={{ height: 100, padding: 20 }}>
            <Text>Food will be ready within {food.readyTime} Minutes</Text>
            <Text>{food.description}</Text>
          </View>
          <View style={{ height: 140 }}>
            <FoodCard item={food} onTap={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  navigation: {
    flex: 1,
    flexDirection: "row",
    marginTop: 43,
    paddingLeft: 10,
    alignItems: "center",
  },
  body: {
    flex: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
});
