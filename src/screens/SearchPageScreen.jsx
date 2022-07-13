import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ButtonWithIcon, FoodCard, SearchBar } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/constants";
import { chekExistance } from "../utils/CartHelper";
import { getCartItems } from "../redux/reducers/UserSlice";

const SearchPageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { searchData, cart } = useSelector((state) => state.UserSlice);

  const onTapFood = (item) => {
    navigation.navigate("FoodDetailsPage", { food: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            marginTop: 50,
            height: 60,
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 4,
          }}
        >
          <ButtonWithIcon
            icon={<Ionicons name="arrow-back" size={40} color={COLORS.white} />}
            onTap={() => navigation.goBack()}
          />
          <SearchBar
            onTextChange={setKeyword}
            onEndEditing={() => setIsEditing(false)}
            didTouch={() => setIsEditing(true)}
          />
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            isEditing
              ? searchData.filter((item) => {
                  return item?.name.includes(keyword);
                })
              : searchData
          }
          renderItem={({ item }) => (
            <FoodCard
              onTap={onTapFood}
              item={chekExistance(item, cart)}
              onUpdateCart={() => {
                dispatch(getCartItems(item));
              }}
            />
          )}
          keyExtractor={(item) => `${item._id}`}
        />
      </View>
    </View>
  );
};

export default SearchPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 10,

    alignItems: "center",
    justifyContent: "center",
  },
});
