import { View, Text, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth, getOrders, ordersCol } from '../firebase'
import OrderItem from './OrderItem'
import { APP_CONSTANT } from '../global'
import { onSnapshot, query, where } from 'firebase/firestore'

export default function Orders({location}) {

  const [orders, setOrders] = useState([])


  useEffect(()=>{
    const q = query(ordersCol, where('driverId', '==', auth.currentUser?.uid ))

    onSnapshot(q, snapshot =>{
        
        setOrders(snapshot.docs.filter(doc =>Object.values(APP_CONSTANT).includes(doc.data().status)).map(doc =>({
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

 