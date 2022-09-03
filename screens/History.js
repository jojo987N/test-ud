import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ordersCol } from '../firebase/utils'
import { APP_CONSTANT, colors, icon, screen } from '../global'
import { getDocs } from 'firebase/firestore'

export default function History() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    getDocs(ordersCol).then(snapshot => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
  }, [])
  return (
    <View>
      {orders.map((order, index) => {
        <Pressable key={index} style={styles.container} onPress={() => navigation.navigate(screen.STARTED_ORDER_DETAILS, { order: order })}>
          <Image source={{ uri: order.User.items[0].restaurant.image_url }} style={styles.image} />
          <View style={styles.infos}>
            <Text style={styles.title}>{order.Restaurant.name}</Text>
            <Text style={styles.address}>{order.Restaurant.address}</Text>
            <Text style={styles.orderIdText}>{APP_CONSTANT.TEXT.ORDER_ID} : </Text>
            <Text style={styles.orderId}>{order.orderId}</Text>
          </View>
          <View style={styles.status}>
            <Entypo name={icon.STARTED_ORDER} size={30} color={colors.CHECK} />
          </View>
        </Pressable>
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    borderColor: colors.ORDER_CONFIRMED
  },
  infos: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold"
  },
  address: {
    color: colors.ADDRESS
  },
  orderId: {
    color: colors.grey3
  },
  status: {
    backgroundColor: colors.ORDER_CONFIRMED,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center"
  },
  orderIdText: {
    marginTop: 10
  }

})

