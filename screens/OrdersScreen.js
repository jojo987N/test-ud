import { View, Text, useWindowDimensions, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import MapView, { Marker } from 'react-native-maps'
import OrderCountDown from '../components/OrderCountDown'
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Entypo } from '@expo/vector-icons'
import { updateDriverOnOff } from '../firebase/utils'
import { APP_CONSTANT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../global'
import OnlineOffLine from '../components/OnlineOffLine'
import Orders from '../components/Orders'
import Menu from '../components/Menu'
import Dashboard from '../components/Dashboard'
import { UserContext } from '../context/UserContext'
import CalendarComponent from '../components/CalendarComponent'
import Loading from '../components/Loading'
import { colors } from '../global'
import Earnings from '../components/Earnings'
import { MenuButton } from '../components/MenuButton'

export default function OrdersScreen({ route, navigation }) {
  const { userData } = useContext(UserContext)
  const bottomSheet = useRef(null)
  const { width, height } = useWindowDimensions()
  const [opacity, setOpacity] = useState(0.9)
  const [showOrderCountDown, setShowOrderCountDown] = useState(false)
  const [bottomSheetHeight, setBottomSheetHeight] = useState("90%")
  const [mapdirection, setMapdirection] = useState(false)
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [order] = useState({})
  const [onOffline] = useState("")
  const [location, setLocation] = useState({});
  const [destination, setDestination] = useState()
  const [loading, setLoading] = useState(false)
  const [earnings, setEarnings] = useState(0)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== APP_CONSTANT.GRANTED) {
        setErrorMsg(APP_CONSTANT.PERMISSION_TO_LOCATION_DENIED);
        return;
      }
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      bottomSheet?.current.collapse()
    })();
  }, [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: colors.grey3, opacity: opacity }}>
        <MapView
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={{ height: height, width: width }}
        >
          {mapdirection ? (<><MapViewDirections
            origin={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            destination={destination}
            strokeWidth={10}
            strokeColor={colors.green2}
            apikey={apikey}
            onReady={(result) => {
              if (result.distance < 0.1) {
              }
              setTotalMinutes(result.duration.toFixed())
            }}
          />
            <Marker
              coordinate={destination}
            >
              <View style={{
                backgroundColor: colors.green2,
                ...styles.marker
              }}>
                <Entypo name={icon.restaurant} size={30} color={colors.white} />
              </View>
            </Marker></>
          ) : (<></>)}
        </MapView>
        <MenuButton navigation={navigation} />
        <Earnings earnings={earnings} />

        <BottomSheet ref={bottomSheet} index={1} snapPoints={["12%", bottomSheetHeight]}>
          <OnlineOffLine onOffline={onOffline} />




          <BottomSheetScrollView>

            <Orders location={location} route={route} setLoading={setLoading} />
          </BottomSheetScrollView>

          <OffButton />
        </BottomSheet>
      </View>

    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showOrderCountDown: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  marker: {
    borderRadius: 20,
    padding: 5
  },
});