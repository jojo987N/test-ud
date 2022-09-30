import { View, Text } from "react-native";
import React from "react";
import { APP_CONSTANT } from "../../global";

export default function OnlineOffLine({ onOffline }) {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: Platform.OS === "android" ? "bold" : "600",
        }}
      >{`${APP_CONSTANT.YOU_ARE} ${onOffline
        .charAt(0)
        .toUpperCase()}${onOffline.slice(1)}`}</Text>

      <Text style={{ color: "grey" }}> Your Orders : </Text>
    </View>
  );
}
