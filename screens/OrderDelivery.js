import { View, Text, ActivityIndicator, useWindowDimensions,
Pressable, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { FontAwesome5, Entypo, MaterialIcons, Ionicons, FontAwesome} from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { ordersCol, updateOrder } from '../firebase';
import { auth } from '../firebase'
import UserInfos from '../components/UserInfos';
import RestaurantInfos from '../components/RestaurantInfos';
import InfosContainer from '../components/InfosContainer';
import { APP_CONSTANT, grey1 } from '../global';
import { onSnapshot, query, where } from 'firebase/firestore';
import UserProducts from '../components/UserProducts';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
 

export default function OrderDelivery({route}) {

  const {order, location} = route.params
  const navigation = useNavigation()

 // console.log("DELIVERY : ", order)

 //console.log(auth.currentUser?.uid)


  //const [location, setLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [totalKm, setTotalKm] = useState(0)
  const [colorButton, setColorButton]= useState("green")
  const [textButton, setTextButton]= useState(APP_CONSTANT.START_DELIVERY)
  //const [orderStatuses, setOrderStatuses]=useState("READY_FOR_PICKUP")
  //const [orderStatuses, setOrderStatuses]=useState("New")
  const [orderStatus, setOrderStatus]=useState(order.status)
  //const [order, setOrder] = useState({})

  // const ORDER_STATUSES ={
  //   READY_FOR_PICKUP: "READY_FOR_PICKUP",
  //   ACCEPTED : "ACCEPTED",
  //   PICKED_UP: "PICKED_UP"
 
  //  }

  //const ORDER_STATUSES = "READY_FOR_PICKUP";

  //let orderStatuses = "READY_FOR_PICKUP"



  //const [deliveryStatus, setDeliveryStatus] = useState(ORDER_STATUSES.READY_FOR_PICKUP)
  const [isDriverClose, setIsDriverClose] = useState(false)
  const [isDriverFinish, setIsDriverFinish] = useState(false)

  const [delta, setDelta]=useState({
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [destination, setDestination] = useState({
    latitude: order.User.lat,
    longitude: order.User.lng
  })

  const [waypoints, setWaypoints]= useState([{
              latitude: order.Restaurant.lat,
              longitude: order.Restaurant.lng,
            }])

   
    const bottomSheet = useRef(null)
    const mapRef = useRef(null)
    const button = useRef(null)

    const { width, height } = useWindowDimensions()



    const renderButtonTitle = ()=>{
       
      if(orderStatus === APP_CONSTANT.ACCEPTED){
        return APP_CONSTANT.START_DELIVERY
      }
      if(orderStatus === APP_CONSTANT.START_DELIVERY){

        return APP_CONSTANT.PICK_UP
      }
      if(orderStatus === APP_CONSTANT.PICKED_UP){

        return APP_CONSTANT.FINISH
      }
      if(orderStatus === APP_CONSTANT.COMPLETED){

        return APP_CONSTANT.COMPLETED
      }
      if(orderStatus === APP_CONSTANT.CANCELED){

        return APP_CONSTANT.CANCELED
      }
    }

    const renderButtonColor = ()=>{
       
      if(orderStatus === APP_CONSTANT.ACCEPTED){
        return "green"
      }
      if(orderStatus === APP_CONSTANT.START_DELIVERY){

        return "orange"
      }
      if(orderStatus === APP_CONSTANT.PICKED_UP){

        return "#996300"
      }
      if(orderStatus === APP_CONSTANT.COMPLETED){

        return "blue"
      }
      if(orderStatus === APP_CONSTANT.CANCELED){

        return "red"
      }
    }



    const getOrderStatus = ()=>{

      const q= query(ordersCol, where('orderId', '==', order.orderId))
       
      onSnapshot(q, (snapshot)=>{
      

          setOrderStatus(snapshot.docs[0].data().status)
  
        })
      } 

      const onButtonPressed = () => {

        if(orderStatus === APP_CONSTANT.ACCEPTED){

          bottomSheet?.current.collapse()
  
          mapRef?.current?.getCamera().then((cam)=>{
           cam.zoom += 1;
           mapRef?.current?.animateCamera(cam);
          })


          setDestination({
            latitude: order.Restaurant.lat,
            longitude: order.Restaurant.lng,
          })

          setWaypoints([])

        setTextButton(APP_CONSTANT.PICK_UP)
        setColorButton("orange")
         
        updateOrder(order.id, APP_CONSTANT.START_DELIVERY)
         
        }

        if(orderStatus === APP_CONSTANT.START_DELIVERY){
          
            bottomSheet?.current.collapse()

            setDestination({
              latitude: order.User.lat,
              longitude: order.User.lng
            })
            setTextButton(APP_CONSTANT.FINISH)
            setColorButton("#996300")
           setIsDriverClose(false)
           updateOrder(order.id, APP_CONSTANT.PICKED_UP)
          
        }

        if(orderStatus === APP_CONSTANT.PICKED_UP){
           
          setTextButton(APP_CONSTANT.COMPLETED)
          setColorButton("blue")
          updateOrder(order.id, APP_CONSTANT.COMPLETED)
        
        }
       
      }

     

    useEffect(() => {

      getOrderStatus()
      // (async () => {
      //   let { status } = await Location.requestForegroundPermissionsAsync();
  
      //   //console.log(status)
      //   if (status !== 'granted') {
      //     setErrorMsg('Permission to access location was denied');
      //     return;
      //   }
  
      //   let location = await Location.getCurrentPositionAsync({});
      //   setLocation({
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude
      //   });



      //  setLatitude(location.coords.latitude)
      //  setLongitude(location.coords.longitude)
        //console.log(location)


       
  
     // })();

        // const foregroundSubscription = Location.watchPositionAsync({
        //   accuracy: Location.Accuracy.High,
        //   timeInterval: 10000,
        //   distanceInterval: 100,
        // }, (loc)=>{
        //     setLocation({
        //       latitude: loc.coords.latitude,
        //       longitude: loc.coords.longitude 
        //     })
        // })

        // return foregroundSubscription

       
      
    }, []);


    // if(!location)
    // return <ActivityIndicator size="large"/>

  

    


    

    // const isButtonDisabled = ()=>{

     

    //  if(deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP)
    //   return false
    //   if(deliveryStatus === ORDER_STATUSES.ACCEPTED && isDriverClose)
    //   return false
    //   if(deliveryStatus === ORDER_STATUSES.PICKED_UP && isDriverClose)
    //   return false

    //   return true
    // }


  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <View style={{
        flex: 1,
        //backgroundColor: "blue"
    }}>

          
    <MapView
           provider={PROVIDER_GOOGLE}
          ref={mapRef}

          //ref={(map)=> {this.map=map}}
          initialRegion={{
            //  latitude: 37.78520111708754,
            //  longitude: -122.43200834862841,
            latitude: location.latitude,     // true location
            longitude: location.longitude,
            latitudeDelta: delta.latitudeDelta,
            longitudeDelta: delta.longitudeDelta

          }}
          style={{
            height: height,
            width: width
          }}
          showsUserLocation={true}
          followsUserLocation>

             
          {/* {orders.map((order, index) => ( */}
          

          <MapViewDirections 
          
          origin={{
            latitude: location.latitude,
            longitude: location.longitude,}}

            destination={{
             // latitude: order.User.lat,
             // longitude:  order.User.lng,
              ...destination
            }}
            strokeWidth={10}
            strokeColor={renderButtonColor()}
            waypoints={waypoints}
            apikey={"AIzaSyAwLZyznRMu86EDLO-fsRL8BgrCT7hXq7g"}
            onReady ={(result)=> {

              if(result.distance < 0.1){
                setIsDriverClose(true)
                setColorButton("green")
              }
              
             
              setTotalMinutes(result.duration)
              setTotalKm(result.distance)
            }}
          />

            <CustomMarker subject={order.Restaurant} renderButtonColor={renderButtonColor}/>
            
            <CustomMarker subject={order.User} renderButtonColor={renderButtonColor}/>

        </MapView>

        <BackButton navigation={navigation}/>

    <BottomSheet ref={bottomSheet} index={1} snapPoints={["12%", "95%"]}
    handleIndicatorStyle={{backgroundColor: "grey", width: 100}}>

     <Estimate totalMinutes={totalMinutes} totalKm={totalKm} color={renderButtonColor()}/>

     <InfosContainer order={order} content="Restaurant" />

      <Divider />
      
     <InfosContainer order={order} content="User" />

     <UserProducts order={order} />

     <Divider size={10} color={grey1}/>
          
     {/* Button  */}
    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{onButtonPressed()}}>
    <View style={{...styles.button, 
      backgroundColor: renderButtonColor()
      //colorButton,
      }}>
     <Text style={styles.textButton}>{
     //textButton
     renderButtonTitle()
     //orderStatus
     }</Text>
    </View>
    </TouchableOpacity>

    </BottomSheet>
     
    </View>
    </GestureHandlerRootView>
  )
}

const BackButton = ({navigation}) => <Ionicons 
onPress={()=>navigation.goBack()}
name="arrow-back-circle"
size={45}
color="black"
style={{
  position: 'absolute',
 // zIndex: 1,
  left: 10,
  top: 10
}}/>

const CustomMarker = ({subject, renderButtonColor, icon})=>{

  return (
    <Marker  title={subject.name} description={subject.address}
              coordinate={{
                latitude: subject.lat,
                longitude:subject.lng,
              }}
            >
              <View style={{
                backgroundColor: renderButtonColor(),
                borderRadius: 20,
                padding : 5
                
              }}>
                {subject.items?<Entypo name="user" size={30} color="white" />:
                <MaterialIcons name="restaurant" size={30} color="white" />}
              </View>
              
    </Marker>
  )
}

 
const Estimate = ({totalMinutes, totalKm, color})=> (

  <View style={{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
}}>
  <Text style={{fontSize: 25}}>{totalMinutes.toFixed()} min </Text>
  <FontAwesome5 name="shopping-bag" size={30} color={color}/>
  <Text style={{fontSize: 25}}> {totalKm.toFixed()} km </Text>
</View>
)

const Divider = ({size, color})=>{

return (
<View style={{
  ...styles.divider, 
  borderBottomWidth: size?size:0.3,
  borderBottomColor: color?color: "grey"
  }}>

  </View>)}
 

const styles = StyleSheet.create({

  buttonContainer:{ 
    flex: 1, 
    justifyContent: "flex-end",
  },
  button : {
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
  divider: {
   // borderBottomWidth: 0.3,
    //marginHorizontal: 20,
    marginBottom: 20
  }
})
   



