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
import { COLORS } from "../constants/constants";
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
        <Stack.Screen name="HomeStack" component={MyTabs} />
        <Stack.Screen name="SearchPage" component={SearchPageScreen} />
        <Stack.Screen name="RestaurantPage" component={RestaurantScreen} />
        <Stack.Screen name="FoodDetailsPage" component={FoodDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTabs() {
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
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shop" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Offer"
        component={HomeScreen}
        options={{
          tabBarLabel: "Offer",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Account"
        component={HomeScreen}
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
