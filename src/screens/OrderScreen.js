import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebse";

import { Entypo, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  FoodCard,
  OrderCard,
  ButtonWithTitle,
  ButtonWithIcon,
} from "../components";
import { COLORS } from "../constants/constants";
import {
  getCartItems,
  getTotals,
  getMyOrders,
} from "../redux/reducers/UserSlice";
import PaymentTypePopUp from "react-native-raw-bottom-sheet";

function randomString(length) {
  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz".split("");

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

const OrderPageScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const dispatch = useDispatch();
  const ordersCollectiion = collection(db, "FOOD_ORDER_APP_ORDERS");
  const { cartTotalAmount, cart, token, user, orders, location } = useSelector(
    (state) => state.UserSlice
  );

  // console.log("orders", orders);
  // console.log("token", token);
  console.log("userOrders", userOrders);
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

  const createOrder = async () => {
    const data = {
      uuid: token,
      date: new Date(),
      orderId: randomString(8),
      total: cartTotalAmount,
      orderStatus: "Waiting",
    };
    console.log("data", data);
    setLoading(true);

    try {
      await setDoc(doc(db, "FOOD_ORDER_APP_ORDERS", token), data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", err.message, [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "OK" },
      ]);
    }
  };

  // const createOrder = () => {
  //   let cartItems = new Array();

  //   cart?.map((item) => {
  //     cartItems.push({ _id: item._id, unit: item.unit });
  //   });

  //   setLoading(true);
  //   return async () => {
  //     try {
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //       const response = await axios.patch(
  //         `https://online-foods.herokuapp.com/user/create-order`,
  //         { cart }
  //       );
  //       setLoading(false);
  //       console.log("response", response);
  //       setLoading(false);
  //     } catch (err) {}
  //   };
  // };

  const getOrders = async () => {
    setLoading(true);
    try {
      const data = await getDocs(ordersCollectiion);

      const allOrders = data?.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(("allOrders", allOrders));

      setUserOrders(allOrders?.filter((order) => order?.uuid === token));
      dispatch(getMyOrders(JSON.stringify(userOrders)));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onTapPlaceOrder = () => {
    createOrder();
  };

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

  useEffect(() => {
    getOrders();
  }, []);

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

      {userOrders && (
        <View style={{ flex: 3, marginTop: 20 }}>
          {userOrders?.map((order) => (
            <OrderCard order={order} />
          ))}
        </View>
      )}

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
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <ButtonWithTitle title="Order Now" onTap={createOrder} />
          )}
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
