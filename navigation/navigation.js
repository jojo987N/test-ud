import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import OrdersScreen from '../screens/OrdersScreen';
import OrderDelivery from '../screens/OrderDelivery';
import SignIn from '../screens/authScreens/SignIn';
import Bonjour from '../screens/Bonjour';
 

export default function RootNavigation() {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
           
           <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
           <Stack.Screen name="Bonjour" component={Bonjour} options={{headerShown: false}}/>
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{headerShown: false}}/>
            <Stack.Screen name="OrderDelivery" component={OrderDelivery} options={{headerShown: false}}/>
            

        </Stack.Navigator>
    </NavigationContainer>
  )
}