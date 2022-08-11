import { View, Text, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { auth, updateOrder } from '../firebase';
import { APP_CONSTANT } from '../global';

export default function OrderCountDown({setOpacity, setShowOrderCountDown, 
  setBottomSheetHeight, setMapdirection, totalMinutes, setDescription,
   order, location}) {

    const [duration, setDuration]=useState(15)
    //const [colorBackground, setColorBackground]= useState("rgb(30,30,30,0.5)")

     const navigation = useNavigation()
  return (
    <View style={{
     //  backgroundColor: colorBackground,
        flex: 1,
       justifyContent: "space-between",
       // alignItems: "center",
        
    }}
     
    >

      <TouchableOpacity
      onPress={()=>{
        setShowOrderCountDown(false)
        setShowOrderCountDown(false)
        setOpacity(1)
        setBottomSheetHeight("90%")
      }}
       style={{
        flexDirection: "row",
        backgroundColor: "#4d4d4d",
        width: 150,
        borderRadius: 30,
        padding: 10,
        margin: 20

      }}>
        <MaterialIcons name="close" size={30} color="white" />
        <Text style={{
        color: "white",
        //padding: 15,
        fontSize: 20
      }}>DECLINE</Text>
      
      </TouchableOpacity>

      <View style={{
        backgroundColor: "#4d4d4d",
        marginHorizontal: 20,
        borderRadius: 10
      }}>
       <View style={{
         flexDirection: "row",
         justifyContent: "center",
         alignItems: "center",
         marginTop: 10,
         marginBottom: 10
       }}>
        {/* <Text>Delivery</Text> */}
       <TouchableOpacity onPress={()=>{

         setShowOrderCountDown(false)
         setShowOrderCountDown(false)
         setOpacity(1)
         setBottomSheetHeight("90%")
        
        // updateOrder(order.id, APP_CONSTANT.ACCEPTED, auth.currentUser?.uid)
        
        //   navigation.navigate('OrderDelivery', {
        //     order: order,
        //     location: location
        //   })
        
          
       
       

       }}>
         <CountdownCircleTimer
         
          isPlaying
          duration={duration}
          colors={['#ffffff', '#F7B801', '#A30000', '#A30000' ]}
          colorsTime={[7, 5, 2, 0]}
          onUpdate={(remainingTime)=> {
              if(remainingTime %2 === 0)
              setOpacity(0.4)
              else
              setOpacity(0.8)
              setBottomSheetHeight("12%")
             // console.log(remainingTime)
          }}
          onComplete={()=>{
               setShowOrderCountDown(false)
               setOpacity(1)
               setBottomSheetHeight("90%")
               setMapdirection(false)
          }}
          size={100}
          strokeWidth={10}
          trailColor="#737373"
          >
          {({a})=><Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20
         
          }}>Accept</Text>}
          </CountdownCircleTimer>
       </TouchableOpacity>
        {/* <Text>Meal</Text> */}
       </View>

        <View style={{
          
        }}>
          <Text style={{
            textAlign: "center",
            fontSize: 45,
            color: "white",
            fontWeight: 'bold',
            marginBottom: 8

          }}>{totalMinutes
          } min</Text>
           
        </View>
        <View>
          <Text style={{
            textAlign: "center",
            fontSize: 35,
            color: "white",
            fontWeight: 'bold',
            marginBottom: 2

          }}>151 3rd St, San Francisco</Text>
        </View>
      </View>
      
        
    </View>
  )
}