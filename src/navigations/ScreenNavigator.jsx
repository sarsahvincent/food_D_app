import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import LandingScreen from "../screens/LandingScreen";
import HomeScreen from "../screens/HomeScreen";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import SearchPageScreen from "../screens/SearchPageScreen";
import OfferScreen from "../screens/OfferScreen";
import LoginScreen from "../screens/LoginScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";
import { COLORS } from "../constants/constants";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function ScreenNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerShown: false,
          headerStyle: { backgroundColor: COLORS.primary },
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Landing"
          component={LandingScreen}
        />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerShown: false,
        headerStyle: { backgroundColor: COLORS.primary },
      }}
    >
      <Stack.Screen name="HomePage" component={HomeScreen} />
      <Stack.Screen name="SearchPage" component={SearchPageScreen} />
      <Stack.Screen name="RestaurantPage" component={RestaurantScreen} />
      <Stack.Screen name="FoodDetailsPage" component={FoodDetailsScreen} />
      <Stack.Screen name="LoginPage" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  const { cart } = useSelector((state) => state.UserSlice);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shop" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          tabBarLabel: "Offer",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          tabBarBadge: cart?.length > 0 ? cart?.length : null,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
