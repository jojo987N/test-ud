import { View, Text, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth, getOrders, ordersCol } from '../firebase'
import OrderItem from './OrderItem'
import { APP_CONSTANT } from '../global'
import { onSnapshot, query, where } from 'firebase/firestore'

export default function Orders({location, route}) {

  const [orders, setOrders] = useState([])

  
  useEffect(()=>{
    //const q = query(ordersCol, where('driverId', '==', auth.currentUser?.uid ))
     
    let q = ordersCol
    if(route.params.status !== "history")
     q = query(ordersCol, where('status', '==', route.params.status ))

    onSnapshot(q, snapshot =>{
        
        // setOrders(snapshot.docs.filter(doc =>Object.values(APP_CONSTANT).includes(doc.data().status)).map(doc =>({
        //   id: doc.id,
        //   ...doc.data()
        // })))

        setOrders(snapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
          })))
    })
   // getOrders().then((orders)=>setOrders(orders))
  }, [])
  return (
    <View>
       {orders.map((order, index)=> <OrderItem key={index} order={order} location = {location}  />)}
    </View>
  )
}

 