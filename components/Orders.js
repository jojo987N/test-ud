import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ordersCol } from '../firebase/utils'
import OrderItem from './OrderItem'
import { getDocs } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Orders({ location, route, setLoading }) {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    setLoading(true)

    getDocs(ordersCol).then(snapshot => {
      let orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrders(orders)
      setLoading(false)
    })


  }, [])
  return (
    <View>
      {orders.map((order, index) => <OrderItem key={index} order={order} location={location} />)}
    </View>
  )
}
