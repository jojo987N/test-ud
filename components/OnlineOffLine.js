import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
export default function OnlineOffLine({ onOffline }) {
  return (
    <View
      style={styles.container}>
      <Text style={styles.text}>{
        "You're online"
      }</Text>
      <Text style={{ color: "grey" }}> Your Orders : </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  }

})