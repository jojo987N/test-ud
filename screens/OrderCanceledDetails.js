import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import UserInfos from '../components/UserInfos';
import RestaurantInfos from '../components/RestaurantInfos';
import { APP_CONSTANT, colors, delta, grey1, SCREEN_HEIGHT, SCREEN_WIDTH, _bottomSheet } from '../global';
import UserProducts from '../components/UserProducts';
import RestaurantMarker from '../components/RestaurantMarker';

export default function OrderCanceledDetails({ route }) {
  const { order } = route.params
  const navigation = useNavigation()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <RestaurantMarker restaurant={order.Restaurant} />
      </MapView>
      <BackButton navigation={navigation} />
      <BottomSheet  index={1} snapPoints={_bottomSheet.snapPoints} handleIndicatorStyle={styles.handleIndicatorStyle}>
        <RestaurantInfos order={order} />
        <Divider />
        <UserInfos order={order} />
        <UserProducts order={order} />
        <Divider size={10} color={grey1} />
        <TouchableOpacity style={styles.buttonContainer} >
          <View style={styles.button}>
            <Text style={styles.textButton}>{APP_CONSTANT.TEXT.CANCELED}</Text>
          </View>
        </TouchableOpacity>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  mapview: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  handleIndicatorStyle: {
    backgroundColor: colors.handleIndicatorStyle,
    width: 100
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
    justifyContent: "center",
    backgroundColor: colors.ORDER_CANCELED
  },
  textButton: {
    color: colors.white,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold"
  },
})
