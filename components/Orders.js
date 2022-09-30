import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, getOrders, ordersCol } from "../firebase";
import OrderItem from "./OrderItem";
import { APP_CONSTANT } from "../global";
import { getDocs, onSnapshot, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Orders({ location, route, setLoading }) {
  const [orders, setOrders] = useState();
  useEffect(() => {
    onSnapshot(ordersCol, (snapshot) => {
      let orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (route.params.status !== "history")
        orders = orders.filter((order) => order.status === route.params.status);
      setOrders(orders);
    });
  }, []);

  return (
    <>
      {orders ? (
        <View>
          {orders.map((order, index) => (
            <OrderItem key={index} order={order} location={location} />
          ))}
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
