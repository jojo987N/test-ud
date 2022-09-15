import { View, Text } from 'react-native'
import React from 'react'
import { APP_CONSTANT } from '../../global'

export default function OnlineOffLine({onOffline}) {
  return (
    <View
    style={{
      
      alignItems: "center"
    }}>
      
     <Text style={{
     fontSize: 25,
     fontWeight: Platform.OS === "android" ? "bold" : "600",
    }}>{ 
      
      
      "You're online"
    }</Text>
     
    <Text style={{ color: "grey" }}> Your Orders : </Text>
   

  </View>
  )
}