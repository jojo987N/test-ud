import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet} from "react-native";
import { colors } from "react-native-elements";
import { Marker } from "react-native-maps";
import { icon } from "../global";

const RestaurantMarker = ({restaurant})=>{
    
    return (
      <Marker title={restaurant.name} description={restaurant.address} coordinate={{latitude: type.lat,longitude:type.lng }}>
                <View style={styles.marker}>
                  <MaterialIcons name={icon.RESTAURANT_MARKER} size={30} color={colors.white} />
                </View>
                
      </Marker>
    )
  }
  const styles = StyleSheet.create({
    marker: {
        borderRadius: 20,
        padding : 5
        
      }
  })
  export default RestaurantMarker;