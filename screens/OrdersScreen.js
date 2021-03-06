import { View, Text, FlatList, useWindowDimensions, ActivityIndicator, 
  Switch, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useRef, useState, useEffect} from 'react'
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet'
import OrderItem from '../components/OrderItem'
import { orders } from '../global/data'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from 'react-native-maps'
import OrderCountDown from '../components/OrderCountDown'
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { db, updateDriverOnOff, driversCol, auth, ordersCol} from '../firebase'
import {collection, orderBy, query, limit, onSnapshot, where} from 'firebase/firestore'
import { currency } from '../global'
import LottieView from 'lottie-react-native'
import { APP_CONSTANT } from '../global'
import OnlineOffLine from '../components/ordersScreen/OnlineOffLine'
import Orders from '../components/Orders'

 

export default function OrdersScreen({route}) {

  const {loc} = route.params

 // console.log(loc)

  const bottomSheet = useRef(null)
  const { width, height } = useWindowDimensions()
  const [opacity, setOpacity]= useState(0.9)
  const [showOrderCountDown, setShowOrderCountDown] = useState(false)
  const [bottomSheetHeight, setBottomSheetHeight] = useState("95%")
  const [mapdirection, setMapdirection] = useState(false)
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [order, setOrder] = useState({})
  const [onOffline, setOnOffline] = useState("")
  


  const [location, setLocation] = useState(loc);
  const [destination, setDestination] = useState(
    {
    latitude: 37.70,
    longitude: -122.42
  }
  )


   const getAvailability = ()=>{

    const q= query(driversCol, where('Id', '==', auth.currentUser?.uid))

    onSnapshot(q, (snapshot)=>{
    
       setOnOffline(snapshot.docs[0].data().onOff)

      })
   } 



  const getOrders = ()=>{

    //const colRef = collection(db, 'orders')
    //const q= query(colRef, orderBy('createdAt', 'desc'), limit(1))

   // const orders = []

    // onSnapshot(q, (snapshot)=>{

      

      onSnapshot(ordersCol, (snapshot)=>{
           console.log("in")
          snapshot.docs.forEach((doc) => {
        
            if(doc.data().createdAt && doc.data().status === APP_CONSTANT.COMFIRMED && onOffline === APP_CONSTANT.ONLINE) {
          
             setOrder({id: doc.id, 
                      ...doc.data()
                      })
             setShowOrderCountDown(true)
             setMapdirection(true)
             setDestination({
              latitude: doc.data().Restaurant.lat,
              longitude: doc.data().Restaurant.lng,
            })
              
              
            }
           
          })

        
    })
    

  }


  useEffect(() => {

    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();

    //   //console.log(status)
    //   if (status !== 'granted') {
    //     setErrorMsg('Permission to access location was denied');
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      
    //   setLocation({
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude
    //   });

    // })();

    getAvailability()

    getOrders()

  }, [])

  // if(!location)
  //   return(<View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
  //      <Text style={{fontSize: 50, fontWeight:"bold"}}>Bonjour</Text>
  //   </View>)
    
  //  <ActivityIndicator size="large"/>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "grey" , opacity:opacity}}>
        <MapView
          initialRegion={{
            // latitude: 37.78520111708754,
            // longitude: -122.43200834862841,
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421

          }}
          style={{
            height: height,
            width: width
          }}
         // showsUserLocation={true}
         // followsUserLocation
          >

          {mapdirection?(<><MapViewDirections
          origin={{
            latitude: location.latitude,
            longitude: location.longitude,}}

            destination={destination}

            strokeWidth={10}
            strokeColor="green"
            apikey={"AIzaSyAwLZyznRMu86EDLO-fsRL8BgrCT7hXq7g"}

            onReady ={(result)=> {

              if(result.distance < 0.1){
               
              }
              
             
             setTotalMinutes(result.duration.toFixed())
              
            }}
            />
             <Marker  
              coordinate={destination}
            >
              <View style={{
                backgroundColor: "green",
                borderRadius: 20,
                padding : 5
                
              }}>
                <Entypo name="shop" size={30} color="white" />
              </View>
              
            </Marker></>
            ):(<></>)} 


        </MapView>
        
        <Earnings />
         
        
       {onOffline === APP_CONSTANT.ONLINE?(<></>):(<GoButton/>)}
       
        <BottomSheet  ref={bottomSheet} index={1} snapPoints={["12%", bottomSheetHeight]}>
         
          <OnlineOffLine onOffline={onOffline}/>
           
          <BottomSheetScrollView>
            <Orders location={location}/>
            <OffButton />
          </BottomSheetScrollView>

        </BottomSheet>
         
      </View>
       
        {showOrderCountDown?(<View style={{
          position: "absolute",
          width: width,
          height:height,
         
          }}>
          <OrderCountDown setOpacity={setOpacity} setShowOrderCountDown={setShowOrderCountDown}
          setBottomSheetHeight={setBottomSheetHeight}
          setMapdirection={setMapdirection}
          totalMinutes = {totalMinutes}
          order={order}
          location={location}

           />
        </View>):(<></>)} 

    </GestureHandlerRootView>
  )
}

const Earnings = ()=>{

  return (
    <View style={{
      position: "absolute",
      backgroundColor: "black",
      alignSelf: "center",
      borderRadius: 20,
      marginTop: 20
    }}>
      <Text style={{
        color: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 25
        
      }}>
        <Text style={{
          color: "#1a8cff"
        }}>{currency}</Text> 0.00 </Text>
    </View>
  )
}

 

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 

const GoButton = ()=>(

  <TouchableOpacity
    
    onPress={()=>{
       
      updateDriverOnOff(APP_CONSTANT.ONLINE)
     }}
    style={{
      position: "absolute",
      backgroundColor: "blue",

      width: 70,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      bottom: 150,
      alignSelf: "center"
    }}>
    <View style={{
      position: "absolute"
    }}>
      <Text style={{
        fontWeight: "bold",
        fontSize: 20,
        color: "white"
      }}>GO</Text>
    </View>
    <LottieView style={{
      height: 70,
      alignSelf: "center",
      width: 70
    }}
      source={require("../assets/animations/5709-test.json")}
      autoPlay
      speed={0.5}
      loop
    />
  </TouchableOpacity>
)

const OffButton = ()=>(
   

<TouchableOpacity 
  
  onPress={()=>{
     
    updateDriverOnOff(APP_CONSTANT.OFFLINE)
  }}
  style={{
    backgroundColor: "red",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20
  }}>
     <Text style={{
       fontWeight: "bold",
       fontSize: 20,
       color: "white"
     }}>OFF</Text>
  </TouchableOpacity>

  
   
)
