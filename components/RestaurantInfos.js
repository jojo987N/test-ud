import { View, Text, StyleSheet,} from 'react-native'
import React from 'react'
import Phone from './Phone'
 

export default function RestaurantInfos({order}) {
  return (
      
    <View style={styles.container}>


    <View style={styles.icon_name_phone}>
       <View style={styles.icon_name}>
           <Ionicons name="restaurant" size={20} color="black" />
            <Text style={styles.name}>{order.Restaurant.name}</Text>
       </View>
        <Phone order={order} />

    </View>

    <View style={styles.address_icon}>
        <Entypo name="location-pin" size={24} color="black" style={styles.icon}/>
        <Text style={styles.address} >{order[content].address}</Text>
    </View>
</View>

  )
}

const styles = StyleSheet.create({

  container:{

     // alignItems: "center"
     marginHorizontal: 25,
      marginBottom: 30,
      //borderWidth: 1

  },
  icon_name_phone:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
   // marginLeft: 5
  },
  icon_name: {
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
      fontSize: 23,
      fontWeight: "bold",
      paddingVertical: 20,
      marginLeft: 5
  },
  address_icon: {
   flexDirection: "row",
   alignItems: "center",
   //borderWidth: 1,
   
   
  },
  address: {
    width: 250,
    marginLeft: 5
  },
  icon: {
     // borderWidth: 1,
      
  }

})