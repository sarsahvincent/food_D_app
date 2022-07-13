import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ButtonWithIcon, FoodCard, SearchBar } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/constants";
import { chekExistance } from "../utils/CartHelper";
import { getCartItems } from "../redux/reducers/UserSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CartPageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { searchData, cart } = useSelector((state) => state.UserSlice);

  const onTapFood = (item) => {
    navigation.navigate("FoodDetailsPage", { food: item });
  };
  console.log("cart", cart);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            marginTop: 50,
            height: 60,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",

            marginHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 24, fontWeight: "700", color: COLORS.primary }}
            >
              My Cart
            </Text>
          </View>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={40}
            color={COLORS.primary}
          />
        </View>
      </View>

      {cart.length > 0 ? (
        <View style={styles.body}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cart}
            renderItem={({ item }) => (
              <FoodCard
                onTap={onTapFood}
                item={item}
                // item={chekExistance(item, cart)}
                onUpdateCart={() => {
                  dispatch(getCartItems(item));
                }}
              />
            )}
            keyExtractor={(item) => `${item._id}`}
          />
        </View>
      ) : (
        <View style={styles.body1}>
          <Text style={{ fontSize: 25, fontWeight: "700", color: "red" }}>
            Cart is Empty
          </Text>
        </View>
      )}

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", color: "black" }}>
              Total
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "black" }}>
              $000
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                marginTop: 10,
                justifyContent: "center",
                borderRadius: 20,
                backgroundColor: COLORS.primary,
                width:
                  Dimensions.get("screen").width -
                  Dimensions.get("screen").width * 0.1,
                height: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: COLORS.white,
                  textAlign: "center",
                }}
              >
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  body1: {
    flex: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 2,
    alignContent: "center",
    justifyContent: "center",
    margin: 0,
  },
});
