import { View, Text, SafeAreaView, StatusBar, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { auth, getDriverInfos} from '../../firebase/utils'
import { signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../../context/UserContext'
import Loading from '../../components/Loading'

export default function SignIn({navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const {setUserData} = useContext(UserContext)


  const SignInUser = async ()=>{
    
    setLoading(true)
    try {
    const re = await signInWithEmailAndPassword(auth, email, password)
    //.then((re)=>{
       
      getDriverInfos().then(docs => {

        AsyncStorage.setItem('driverData', JSON.stringify({...docs[0], email: re.user.email}))

          setUserData({...docs[0], email: re.user.email})
          setLoading(false)
          navigation.navigate('DrawerNavigator')
        // navigation.navigate('DrawerNavigator', {screen: "OrdersScreen", params: {loc: {
        //   latitude: docs[0].lat,
        //   longitude: docs[0].lng,
        // }}})
        // console.log("connected")
         
      })

    }catch(e){
      console.log(e)
      setLoading(false)
     
  }

        

  //  })

    
}

// loading && setTimeout(()=>{
//   setLoading(false)
// }, 10000)

useEffect(()=>{

  AsyncStorage.getItem("driverData")
  .then((value)=>{
    if(value){

     

      let driverData = JSON.parse(value)

      setUserData(driverData)

      navigation.navigate('DrawerNavigator')
    }
  })
   
  // const checkAuth = onAuthStateChanged(auth, (user)=>{
      
  //   if (user) {
  //     AsyncStorage.getItem("driverData")
  //       .then((value) => {
             
  //           let driverData = JSON.parse(value)

  //           setUserData(driverData)

  //           navigation.navigate('DrawerNavigator')
        

  //       })
         
  //     }
  // })
  // return checkAuth
}, [])

if(loading)
return <Loading />

  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#e0ebeb",
      flex: 1
    }}>
       <View style={{
         alignItems: "center",
         marginTop: 50
       }}>

       <Image 
       source={require('../../assets/images/shopping-bag.png')} 
       style={{
         width: 100,
         height: 100
       }}/>

       <Text style={{fontSize: 25, fontWeight: "bold", color: "#3d5c5c",
      letterSpacing: 5}}>Delivery App</Text>

       </View>
       <View style={{
         marginTop: 40
       }}>

         <View style={styles.textInputContainer}>
         <MaterialIcons name="person" size={20} color="#3d5c5c" style={{
           marginLeft: 6,
         }}/>
          <TextInput 
          placeholder='Email' 
          value={email}
          onChangeText={(text)=>setEmail(text)}
          style={styles.textInput}/>
           
         </View>

         <View style={styles.textInputContainer}>
         <MaterialIcons name="lock" size={20} color="#3d5c5c" style={{
           marginLeft: 6,
         }}/>
          <TextInput 
          placeholder='Password' 
          value={password}
          onChangeText={(text)=>setPassword(text)}
          style={styles.textInput}
          secureTextEntry/>
           
         </View>

         <TouchableOpacity  onPress={()=>SignInUser()}>
           <View style={{
             backgroundColor: "#0080ff",
             marginHorizontal: 25,
             borderRadius: 5,
             marginTop: 20
           
           }}>
             <Text style={{
               padding: 16,
               textAlign: "center",
               color: "white",
               fontWeight: "bold",
               fontSize: 15,
               letterSpacing: 2
             }}>Sign In</Text>
           </View>
         </TouchableOpacity>
         

       </View>
 
    </SafeAreaView>
      
     
  )
}

// const styles = StyleSheet.create({
//   textInputContainer: {
//     flexDirection: "row",
//     //borderWidth : 1,
//      backgroundColor: "white",
//      marginHorizontal: 25,
//      //padding: 10,
//     borderRadius: 5,
//      marginTop: 20,
//      alignItems: "center"
//     //marginT
     
//   },
//   textInput: {
//    // borderWidth : 1,
//     width: "90%",
//     padding: 10
//   }
// })

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#b3b3b3"
  },

  header: {
      alignItems: "center",
     // marginTop: 50
     flex: 1,
     paddingBottom: 50,
     justifyContent: "flex-end"
  },
  title: {
      fontSize: 25, fontWeight: "bold", color: "#3d5c5c",
      letterSpacing: 5
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
textInputContainer: {
  flexDirection: "row",
  //borderWidth : 1,
   backgroundColor: "white",
   marginHorizontal: 25,
   //padding: 10,
  borderRadius: 5,
   marginTop: 20,
   alignItems: "center",
   borderBottomWidth: 0.3,
   borderBottomColor: "grey"
  //marginT
   
},
textInput: {
 // borderWidth : 1,
  width: "90%",
  padding: 10
},
signInButton: {
  width: "100%",
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  //flexDirection: "row"
  marginTop: 50
  
},
 signInText: {
     fontSize: 18,
     fontWeight: "bold",
     color: "#3d5c5c",
     letterSpacing: 1
 },

})