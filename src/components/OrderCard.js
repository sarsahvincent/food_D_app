import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants/constants";

const OrderCard = ({ order, onTap }) => {
  console.log("orderoooo", order);
  const getOrderStatus = () => {
    if (order?.orderStatus === "Delivered") {
      return <AntDesign name="checkcircle" size={40} color="black" />;
    } else if (order?.orderStatus === "Cancelled") {
      return <MaterialIcons name="cancel" size={40} color="black" />;
    } else {
      return (
        <MaterialIcons
          name="pending-actions"
          size={40}
          color={COLORS.primary}
        />
      );
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => onTap()}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            flex: 8,
            padding: 5,
            marginTop: 5,
            paddingLeft: 20,
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "500" }}>
            Order ID: {order?.orderId}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "600", color: "#7c7c7c" }}>
            Order ID
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "500", color: "#7c7c7c" }}>
            Order ID
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
          }}
        >
          {getOrderStatus()}
          <Text style={{ fontSize: 12, color: "#7c7c7c" }}>status message</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { OrderCard };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width - 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    height: 100,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
