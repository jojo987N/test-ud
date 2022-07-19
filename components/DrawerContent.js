import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {Avatar, Icon} from 'react-native-elements'
import {
    DrawerContentScrollView, 
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'
//import {signOut } from 'firebase/auth'
//import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
//import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo, MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import OrdersScreen from '../screens/OrdersScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'


export default function DrawerContent(props) {

    const [isSignedIn, setIsSignedIn] = useState(true)

    //const auth = getAuth();
    const navigation = useNavigation()

    const signOutUser = () => {
        AsyncStorage.getAllKeys().then(k => AsyncStorage.multiRemove(k))
        .then(()=>{
        signOut(auth)
        .then(()=>{
            //console.log('c bon')
            //navigation.replace('SignScreen') // Efface tout
            navigation.navigate('SignIn')

        })
    })
        // .catch((err)=>console.log(err.code))
         
    }
  return (
    <View style={styles.container}>
        <DrawerContentScrollView {...props}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
            }}>
                <Avatar
                    rounded
                    avatarStyle={styles.avatar}
                    size={75}
                    source={{uri: "https://www.shareicon.net/data/128x128/2016/04/10/747353_people_512x512.png"}}/>
                <View style={{marginLeft: 10}}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 18,
                    }}>Paul Son</Text>

                    <Text style={{
                        fontSize: 14,
                    }}>driver@goodfood.com</Text>
                </View>
            </View>
             
            <DrawerItemList {...props} />

            {/* <DrawerItem 
                label= "Home"
                icon = {({color,size})=>(
                    <Icon 
                        type="material-community"
                        name="home"
                        color={color}
                        size={size}
                    />
                )}
            /> */}

            {/* <DrawerItem 
                label= "History"
                icon = {({color,size})=>(
                    <Icon 
                        type="material-community"
                        name="history"
                        color={color}
                        size={size}
                    />
                )}
            /> */}

            {/* <DrawerItem 
                label= "My Location"
                icon = {({color,size})=>(
                    <Entypo name="location" size={24} color="black" />
                )}
                onPress={()=> navigation.navigate("OrdersScreen", {})}
            /> */}
            

            {/* <DrawerItem 
                label= "Payment"
                icon = {({color,size})=>(
                    <Icon 
                        type="material-community"
                        name="credit-card-outline"
                        color={color}
                        size={size}
                    />
                )}
            />

            <DrawerItem 
                label= "Stats"
                icon = {({color,size})=>(
                <Ionicons name="stats-chart" size={24} color="black" />
                )}
            /> */}

            {/* <DrawerItem 
                label= "Orders In Progress"
                icon = {({color,size})=>(
                 <MaterialIcons name="pending" size={24} color="black" />
                )}
            /> */}

            {/* <DrawerItem 
                label= "Orders Confirmed"
                icon = {({color,size})=>(
              <MaterialIcons name="confirmation-num" size={24} color="black" />
              )}
            /> */}
            
            {/* <DrawerItem 
                label= "Settings"
                icon = {({color,size})=>(
                    <Icon 
                        type="material-community"
                        name="cog-outline"
                        color={color}
                        size={size}
                    />
                )}
            /> */}
            
        </DrawerContentScrollView>
       <DrawerItem 
                label= "Sign out"
                icon = {({color,size})=>(
                    <Icon 
                        type="material-community"
                        name="logout-variant"
                        color={color}
                        size={size}
                        
                        
                    />
                    
                )}
                onPress={()=>signOutUser()}
                
            />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1  
    },
    avatar: {
        borderWidth: 4,
        borderColor: "white",
    }
})