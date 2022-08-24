import { View, Text, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth, getOrders, ordersCol } from '../firebase/utils'
import OrderItem from './OrderItem'
import { APP_CONSTANT } from '../global'
import {getDocs, onSnapshot, query, where } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Orders({location, route, setLoading}) {

  const [orders, setOrders] = useState([])
  

   

  
  useEffect(()=>{

    console.log("deegghfkhkjlj:")
    setLoading(true)
    //const q = query(ordersCol, where('driverId', '==', auth.currentUser?.uid ))
     
    AsyncStorage.getItem("orders").then(value => {
      if(value){
        
        let orders = JSON.parse(value)
        if (route.params.status !== "history")
        orders = orders.filter(order => order.status === route.params.status)
        setOrders(orders)
        setLoading(false)
      }
      else {

        // let q = ordersCol
        // if (route.params.status !== "history")
        //   q = query(ordersCol, where('status', '==', route.params.status))

        // onSnapshot(q, snapshot =>{
        getDocs(ordersCol).then(snapshot => {

          AsyncStorage.setItem('orders', JSON.stringify(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))))
          
          let orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))

          if (route.params.status !== "history")
          orders = orders.filter(order => order.status === route.params.status)

          setOrders(orders)
          setLoading(false)
        })
      }
    })



     
   // getOrders().then((orders)=>setOrders(orders))
  }, [])

   
  
  return (
    <View>
       {orders.map((order, index)=> <OrderItem key={index} order={order} location = {location}  />)}
    </View>
  )
}

 