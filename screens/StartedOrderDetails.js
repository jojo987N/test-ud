import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { updateOrder } from '../firebase/utils';
import UserInfos from '../components/UserInfos';
import RestaurantInfos from '../components/RestaurantInfos';
import { APP_CONSTANT, colors, delta, grey1, SCREEN_HEIGHT, SCREEN_WIDTH } from '../global';
import UserProducts from '../components/UserProducts';
import RestaurantMarker from '../components/RestaurantMarker';

export default function StartedOrderDetails({ route }) {
  const { order } = route.params
  const navigation = useNavigation()
  const onButtonPressed = () => {
    updateOrder(order.id, APP_CONSTANT.STATUS.PICKED_UP)
  }
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
      <BottomSheet ref={bottomSheet} index={1} snapPoints={["12%", "95%"]} handleIndicatorStyle={styles.handleIndicatorStyle}>
        <RestaurantInfos order={order} />
        <Divider />
        <UserInfos order={order} />
        <UserProducts order={order} />
        <Divider size={10} color={grey1} />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { onButtonPressed() }}>
          <View style={styles.button}>
            <Text style={styles.textButton}>{APP_CONSTANT.TEXT.START_DELIVERY}</Text>
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
    backgroundColor: colors.STARTED_ORDER
  },
  textButton: {
    color: colors.white,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold"
  },
})
