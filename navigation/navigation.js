import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import OrdersScreen from '../screens/OrdersScreen';
import OrderDelivery from '../screens/OrderDelivery';
import SignIn from '../screens/authScreens/SignIn';
import DrawerNavigator from './DrawerNavigator';
import { UserContext } from '../context/UserContext';
import { screen } from '../global';
export default function RootNavigation() {
  const Stack = createStackNavigator();
  const [userData, setUserData] = useState()
  return (
    <NavigationContainer>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Stack.Navigator>
          <Stack.Screen name={screen.SIGN_IN} component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name={screen.DRAWER_NAVIGATOR} component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name={screen.ORDERS_SCREEN} component={OrdersScreen} options={{ headerShown: false }} />
          <Stack.Screen name={screen.ORDER_DELIVERY} component={OrderDelivery} options={{ headerShown: false }} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  )
}