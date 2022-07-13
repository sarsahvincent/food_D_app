import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/constants";
import { Entypo } from "@expo/vector-icons";
import {
  fetchData,
  getCategories,
  getSearchData,
} from "../redux/reducers/UserSlice";
import {
  SearchBar,
  ButtonWithIcon,
  CategoryCard,
  RestaurantCard,
} from "../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation }) => {
  const refreshing = false;
  const dispatch = useDispatch();
  const [availableData, setAvailableData] = useState();
  const { location, data, categories, postalCode, searchResults } = useSelector(
    (state) => state.UserSlice
  );
  const [loading, setLoading] = useState(false);
  console.log("location", location, "searchResults", searchResults);
  const fetchingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://online-foods.herokuapp.com/food/availability/400012"
      );
      const searchResponse = await axios.get(
        `https://online-foods.herokuapp.com/food/search/${postalCode}`
      );
      setAvailableData(response?.data);
      dispatch(getCategories(response?.data));
      dispatch(getSearchData(searchResponse?.data));
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const onTapRestaurant = (item) => {
    navigation.navigate("RestaurantPage", { restaurant: item });
  };

  const onTapFood = (item) => {
    navigation.navigate("FoodDetailsPage", { food: item });
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            flexDirection: "row",

            justifyContent: "center",
            marginTop: 50,
            flex: 4,
            backgroundColor: "#f0f1f5",
            paddingLeft: 20,
            paddingRight: 20,
            alignItems: "flex-start",
          }}
        >
          <Entypo name="location-pin" size={24} color="red" />
          <Text style={{ fontWeight: "700", fontSize: 16, color: "grey" }}>
            {location}
          </Text>
        </View>
        <View
          style={{
            height: 60,

            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 4,
          }}
        >
          <SearchBar
            didTouch={() => {
              navigation.navigate("SearchPage");
            }}
            onTextChange={() => {}}
          />
          <ButtonWithIcon
            icon={
              <MaterialCommunityIcons
                name="tune"
                color={COLORS.white}
                size={40}
              />
            }
          />
        </View>
      </View>

      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchingData}
              />
            }
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={availableData?.categories}
              renderItem={({ item }) => (
                <CategoryCard item={item} onTap={() => {}} />
              )}
              keyExtractor={(item) => item?.id}
            />
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "600",
                  color: COLORS.primary,
                  marginLeft: 20,
                }}
              >
                To Restaurant
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={availableData?.restaurants}
                renderItem={({ item }) => (
                  <RestaurantCard item={item} onTap={onTapRestaurant} />
                )}
                keyExtractor={(item) => item?._id}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "600",
                  color: COLORS.primary,
                  marginLeft: 20,
                }}
              >
                30 Minutes Foods
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={availableData?.foods}
                renderItem={({ item }) => (
                  <RestaurantCard item={item} onTap={onTapFood} />
                )}
                keyExtractor={(item) => item?._id}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f1f5",
  },
  navigation: {
    flex: 2.2,
  },
  body: {
    flex: 9,
    justifyContent: "center",
  },
});
