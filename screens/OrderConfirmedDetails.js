import {
  View, Text, ActivityIndicator, useWindowDimensions,
  Pressable, StyleSheet, TouchableOpacity
} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { FontAwesome5, Entypo, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { ordersCol, updateOrder } from '../firebase/utils';
import { auth } from '../firebase/utils'
import UserInfos from '../components/UserInfos';
import RestaurantInfos from '../components/RestaurantInfos';
import InfosContainer from '../components/InfosContainer';
import { APP_CONSTANT, grey1, SCREEN_HEIGHT, SCREEN_WIDTH } from '../global';
import { onSnapshot, query, where } from 'firebase/firestore';
import UserProducts from '../components/UserProducts';

export default function OrderConfirmedDetails({ route }) {
  const { order } = route.params
  const navigation = useNavigation()
  const onButtonPressed = () => {
    updateOrder(order.id, APP_CONSTANT.STATUS.STARTED_ORDER)
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{
        flex: 1,
      }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: order.Restaurant.lat,
            longitude: order.Restaurant.lng,
            latitudeDelta: delta.latitudeDelta,
            longitudeDelta: delta.longitudeDelta
          }}
          style={styles.mapview}
          showsUserLocation={true}
          followsUserLocation>
          <CustomMarker subject={order.Restaurant} renderButtonColor={renderButtonColor} />
        </MapView>
        <BackButton navigation={navigation} />
        <BottomSheet ref={bottomSheet} index={1} snapPoints={["12%", "95%"]}
          handleIndicatorStyle={{ backgroundColor: "grey", width: 100 }}>
          <RestaurantInfos order={order} />
          <Divider />
          <UserInfos order={order} />
          <UserProducts order={order} />
          <Divider size={10} color={grey1} />
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            onButtonPressed()
          }}>
            <View style={styles.button}>
              <Text style={styles.textButton}>{APP_CONSTANT.TEXT.START_DELIVERY}</Text>
            </View>
          </TouchableOpacity>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  mapview: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 30,
    justifyContent: "center"
  },
  textButton: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold"
  },
})
