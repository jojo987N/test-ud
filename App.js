import { View, SafeAreaView, StatusBar} from "react-native";
import RootNavigation from "./navigation/navigation";
import OrderDelivery from "./screens/OrderDelivery";
import OrdersScreen from "./screens/OrdersScreen";
// import {} from "./firebase/utils"

export default function App() {

  return (
     
      <SafeAreaView 
        style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}>
       
      <RootNavigation />
      {/* <OrdersScreen /> */}
      {/* <OrderDelivery /> */}
      
       </SafeAreaView>
      
  
     
  );
}
