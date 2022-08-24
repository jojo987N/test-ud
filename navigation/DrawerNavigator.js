import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
//import BottomTabs from './BottomTabs'
import { Icon } from 'react-native-elements';
import OrdersScreen from '../screens/OrdersScreen';
//import BusinessConsoleScreen from '../screens/BusinessConsoleScreen';
import DrawerContent from '../components/DrawerContent';
import Dashboard from '../components/Dashboard';
import History from '../screens/History';
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Settings from '../screens/Settings';
import { useNavigation } from '@react-navigation/native'
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const navigation = useNavigation()
  return (
    <Drawer.Navigator  
    screenOptions={{headerShown: false }}
    drawerContent= {props => <DrawerContent {...props}/>}
    useLegacyImplementation={true}
    >
        {/* <Drawer.Screen 
            name = "BottomTabs"
            component={BottomTabs}
            options={{
                title: "Client",
                drawerIcon: ({focussed, size}) =>(
                  <Icon 
                    type="material-community"
                    name="home"
                    color={focussed ? "black":""}
                    size={size}
                  />  
                )
            }}
        /> */}
        {/* <Drawer.Screen 
            name = "OrdersScreen"
            component={OrdersScreen}
            options={{
                title: "Business",
                drawerIcon: ({focussed, size}) =>(
                  <Icon 
                    type="material"
                    name="business"
                    color={focussed ? "black":""}
                    size={size}
                  />  
                )
            }}
        /> */}

        <Drawer.Screen 
            name = "Home"
            // initialParams={{dashboard: "dashboard"}}
            component={Home}
            options={{
                title: "Home",
                drawerIcon: ({focussed, size}) =>(
                  <Icon 
                  type="material-community"
                  name="home"
                  color={focussed}
                  size={size}
              />
                )
            }}

            onPress={()=>navigation.closeDrawer()}
        />

    <Drawer.Screen 
            name = "History"
            initialParams={{status: "history"}}
            component={OrdersScreen}
            options={{
                title: "History",
                drawerIcon: ({focussed, size}) =>(
                  <Icon 
                        type="material-community"
                        name="history"
                        color={focussed}
                        size={size}
                    />
                )
            }}
        />

    <Drawer.Screen 
            name = "Orders Confirmed"
            initialParams={{status: "ACCEPTED"}}
            component={OrdersScreen}
            options={{
                title: "Orders Confirmed",
                drawerIcon: ({focussed, size}) =>(
                  <MaterialIcons 
                  name="confirmation-num" 
                  size={size} 
                  color={focussed} />
                )
            }}
        />

    {/* <Drawer.Screen 
            name = "Orders In Progress"
            initialParams={{status: "InProgress"}}
            component={OrdersScreen}
            options={{
                title: "Orders In Progress",
                drawerIcon: ({focussed, size}) =>(
                  <MaterialIcons 
                  name="pending" 
                  size={size} 
                  color={focussed} />
                )
            }}
        /> */}

      <Drawer.Screen 
            name = "Start Delivery"
            initialParams={{status: "Start Delivery"}}
            component={OrdersScreen}
            options={{
                title: "Start Delivery",
                drawerIcon: ({focussed, size}) =>(
                  <FontAwesome 
                  name="hourglass-start" 
                  size={size} 
                  color={focussed} />
                )
            }}
        />
        <Drawer.Screen 
            name = "Orders Picked Up"
            initialParams={{status: "PICKED_UP"}}
            component={OrdersScreen}
            options={{
                title: "Orders Picked Up",
                drawerIcon: ({focussed, size}) =>(
                  <MaterialIcons 
                  name="delivery-dining" 
                  size={size} 
                  color={focussed} />
                )
            }}
        />

      <Drawer.Screen 
            name = "Orders Completed"
            initialParams={{status: "Completed"}}
            component={OrdersScreen}
            options={{
                title: "Orders Completed",
                drawerIcon: ({focussed, size}) =>(
                  <AntDesign name="checkcircle" 
                  size={size} color={focussed} />
                )
            }}
        />

      <Drawer.Screen 
            name = "Orders Canceled"
            initialParams={{status: "CANCELED"}}
            component={OrdersScreen}
            options={{
                title: "Orders Canceled",
                drawerIcon: ({focussed, size}) =>(
                  <MaterialIcons 
                  name="cancel" 
                  size={size} 
                  color={focussed} />
                )
            }}
        />
      <Drawer.Screen 
            name = "My Location"
            initialParams={{myLocation: true}}
            component={OrdersScreen}
            options={{
                title: "My Location",
                drawerIcon: ({focussed, size}) =>(
                  <Entypo
                  name="location" 
                  size={size} 
                  color={focussed} />
                )
            }}
        />

    <Drawer.Screen 
            name = "Settings"
            //initialParams={{}}
            component={Settings}
            options={{
                title: "Settings",
                drawerIcon: ({focussed, size}) =>(
                  <Icon 
                  type="material-community"
                  name="cog-outline"
                  color={focussed}
                  size={size}
              />
                )
            }}
        />



    </Drawer.Navigator>
  )
}