import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ButtonWithIcon, FoodCard } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/constants";
import { chekExistance } from "../utils/CartHelper";
import { getCartItems } from "../redux/reducers/UserSlice";

const RestaurantScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const { cart } = useSelector((state) => state.UserSlice);

  const dispatch = useDispatch();
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
          {restaurant?.name}
        </Text>
      </View>
      <View style={styles.body}>
        <ImageBackground
          source={{ uri: `${restaurant.images}` }}
          style={{
            width: screenWidth,
            height: 320,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              height: 120,
              backgroundColor: "rgba(0, 0, 0, 0.6",
              padding: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 40, fontWeight: "700" }}>
              {restaurant.name}
            </Text>
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: "500" }}>
              {restaurant.address} {restaurant.phone}
            </Text>
          </View>
        </ImageBackground>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={restaurant.foods}
          renderItem={
            ({ item }) => (
              <FoodCard
                onTap={onTapFood}
                item={chekExistance(item, cart)}
                onUpdateCart={() => {
                  dispatch(getCartItems(item));
                }}
              />
            )

            // <FoodCard item={item} onTap={onTapFood} />
          }
          keyExtractor={(item) => `${item._id}`}
        />
      </View>
      <View></View>
    </View>
  );
};

export default RestaurantScreen;

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
    flex: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
