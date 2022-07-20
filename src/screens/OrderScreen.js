import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import { FoodCard, ButtonWithTitle, ButtonWithIcon } from "../components";
import { COLORS } from "../constants/constants";
import { getCartItems, getTotals } from "../redux/reducers/UserSlice";
import { Ionicons } from "@expo/vector-icons";
import PaymentTypePopUp from "react-native-raw-bottom-sheet";

const OrderPageScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { cartTotalAmount, cart, token, user, location } = useSelector(
    (state) => state.UserSlice
  );

  const onTapFood = (item) => {
    navigation.navigate("Cart", { food: item });
  };

  const validateUser = () => {
    if (!token) {
      navigation.navigate("LoginPage");
    } else {
      popupRef.current?.open();
    }
  };

  const popupRef = createRef();

  const popupView = () => {
    return (
      <PaymentTypePopUp
        height={400}
        ref={popupRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            justifyContent: "flex-start",
            alignItems: "center",
          },
        }}
      >
        <View
          style={{
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View style={styles.paymentView}>
            <Text style={{ fontSize: 20 }}>Payable</Text>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              ${cartTotalAmount.toFixed(2)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", height: 100, padding: 20 }}>
            <Entypo name="location" size={40} color="red" />
            <View style={{ marginLeft: 5 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}
              >
                Address Used to Delivery
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 6,
                  color: "#666666",
                  width: Dimensions.get("screen").width - 60,
                }}
              >
                {location}
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.paymentOptions}>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.icon}
                  source={require("../../assets/fast.png")}
                />
                <Text style={styles.optionText}>Cash On Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.icon}
                  source={require("../../assets/momo.png")}
                />
                <Text style={styles.optionText}>Mobile Money</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.icon}
                  source={require("../../assets/visa_master.png")}
                />
                <Text style={styles.optionText}>Card Payment</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </PaymentTypePopUp>
    );
  };
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            marginTop: 50,
            height: 60,
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",

            marginHorizontal: 20,
          }}
        >
          <ButtonWithIcon
            icon={<Ionicons name="arrow-back" size={40} color={COLORS.white} />}
            onTap={() => navigation.navigate("Cart")}
          />
          <View>
            <Text
              style={{ fontSize: 24, fontWeight: "700", color: COLORS.primary }}
            >
              Orders
            </Text>
          </View>
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
              ${cartTotalAmount}
            </Text>
          </View>
          <ButtonWithTitle title="Order Now" onTap={validateUser} />
        </View>
      )}
      {popupView()}
    </View>
  );
};

export default OrderPageScreen;

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
  paymentView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    margin: 5,
    backgroundColor: "#e3be74",
  },
  options: {
    height: 120,
    width: 160,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    borderColor: "#a0a0a0",
    backgroundColor: "#f2f2f2",
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 10,
  },
  paymentOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
  },
  icon: {
    width: 115,
    height: 80,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#545252",
  },
});
