import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/constants";

const ButtonWithTitle = ({
  title,
  onTap,
  disabled = false,
  isNoBg = false,
  canRequest,
}) => {
  if (isNoBg) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={onTap}
          disabled={disabled}
          activeOpacity={0.7}
          style={{
            marginTop: 10,
            justifyContent: "center",
            borderRadius: 20,
            backgroundColor: "transparent",
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
              color: disabled ? "#6f6f6f" : "#3980d9",
              textAlign: "center",
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          disabled={disabled}
          onPress={onTap}
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
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export { ButtonWithTitle };

const styles = StyleSheet.create({});
