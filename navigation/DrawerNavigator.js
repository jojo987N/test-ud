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
     
    </Drawer.Navigator>
  )
}