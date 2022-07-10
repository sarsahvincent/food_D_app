import React, { useState, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { getLocationDetails } from "../redux/reducers/UserSlice";
import { useDispatch } from "react-redux";
const screenWidth = Dimensions.get("screen").width;

const LandingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const refreshing = false;
  const [displayAddress, setDisplayAddress] = useState(
    "Waiting for Current Location"
  );

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Permission to access location was denied", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { coords } = location;
    if (coords) {
      const { latitude, longitude } = coords;

      let addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of addressResponse) {
        let curentAddress = `${item.name}, ${item.street}, ${item.country}`;
        dispatch(getLocationDetails(curentAddress));
        setDisplayAddress(curentAddress);

        if (curentAddress.length > 0) {
          setTimeout(() => {
            navigation.navigate("HomeStack");
          }, 2000);
        }
        return;
      }
    } else {
      Alert.alert("Error Location", "Something went wrong fetching location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require("../images/animados-gifs-de-motoboys-1.gif")}
          style={styles.deliveryIcon}
        />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Your Delivery Address</Text>
          <Entypo name="location" size={24} color="#bb295d" />
        </View>
        {displayAddress === "Waiting for Current Location" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.addressText}>{displayAddress}</Text>

            <ActivityIndicator color="white" size="small" />
          </View>
        ) : (
          <Text style={styles.addressText}>{displayAddress}</Text>
        )}
        {displayAddress !== "Waiting for Current Location" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeStack")}
            activeOpacity={0.5}
          >
            <View
              style={{
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                backgroundColor: "white",
                borderRadius: 100,
                shadowColor: "black",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,
                elevation: 10,
              }}
            >
              <Ionicons name="arrow-forward-circle" size={40} color="#bb295d" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4e675",
  },
  navigation: {
    flex: 2,
    // backgroundColor: "red",
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  deliveryIcon: {
    width: "100%",
    height: 300,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: screenWidth - 100,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  addressTitle: {
    marginRight: 10,
    fontSize: 24,
    fontWeight: "700",
    color: "#707070",
  },
  addressText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#bb295d",
    marginRight: 5,
  },
});
