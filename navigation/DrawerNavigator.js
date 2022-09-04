import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Icon } from 'react-native-elements';
import OrdersScreen from '../screens/OrdersScreen';
import DrawerContent from '../components/DrawerContent';
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Settings from '../screens/Settings';
import { useNavigation } from '@react-navigation/native'
import { APP_CONSTANT, icon, screen } from '../global';

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  const navigation = useNavigation()
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <DrawerContent {...props} />}
      useLegacyImplementation={true}
    >
      <Drawer.Screen
        name={screen.HISTORY}
        component={OrdersScreen}
        options={{
          title: APP_CONSTANT.TEXT.HISTORY,
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material-community"
              name={icon.HISTORY}
              color={focussed}
              size={size}
            />
          )
        }}
      />
      <Drawer.Screen
        name={screen.ORDERS_CONFIRMED}
        component={OrdersScreen}
        options={{
          title: APP_CONSTANT.TEXT.ORDERS_CONFIRMED,
          drawerIcon: ({ focussed, size }) => (
            <MaterialIcons
              name={icon.DRAWER_ORDER_CONFIRMED}
              size={size}
              color={focussed} />
          )
        }}
      />
      <Drawer.Screen
        name={screen.STARTED_ORDERS}
        component={OrdersScreen}
        options={{
          title: screen.STARTED_ORDERS,
          drawerIcon: ({ focussed, size }) => (
            <FontAwesome
              name={icon.DRAWER_STARTED_ORDERS}
              size={size}
              color={focussed} />
          )
        }}
      />
      <Drawer.Screen
        name={screen.ORDERS_PICKED_UP}
        component={OrdersScreen}
        options={{
          title: APP_CONSTANT.TEXT.ORDERS_PICKED_UP,
          drawerIcon: ({ focussed, size }) => (
            <MaterialIcons
              name={icon.DRAWER_ORDERS_PICKED_UP}
              size={size}
              color={focussed} />
          )
        }}
      />
      <Drawer.Screen
        name={screen.ORDERS_COMPLETED}
        component={OrdersScreen}
        options={{
          title: APP_CONSTANT.TEXT.ORDERS_COMPLETED,
          drawerIcon: ({ focussed, size }) => (
            <AntDesign name={icon.DRAWER_ORDERS_COMPLETED}
              size={size} color={focussed} />
          )
        }}
      />
      <Drawer.Screen
        name={screen.ORDERS_CANCELED}
        component={OrdersScreen}
        options={{
          title: APP_CONSTANT.TEXT.ORDERS_CANCELED,
          drawerIcon: ({ focussed, size }) => (
            <MaterialIcons
              name={icon.DRAWER_ORDERS_CANCELED}
              size={size}
              color={focussed} />
          )
        }}
      />
      <Drawer.Screen
        name={APP_CONSTANT.TEXT.MY_LOCATION}
        component={OrdersScreen}
        options={{
          title: APP_CONSTANT.TEXT.MY_LOCATION,
          drawerIcon: ({ focussed, size }) => (
            <Entypo
              name={icon.MY_LOCATION}
              size={size}
              color={focussed} />
          )
        }}
      />
      <Drawer.Screen
        name={screen.SETTINGS}
        component={Settings}
        options={{
          title: APP_CONSTANT.TEXT.SETTINGS,
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material-community"
              name={icon.DRAWER_SETTINGS}
              color={focussed}
              size={size}
            />
          )
        }}
      />
    </Drawer.Navigator>
  )
}