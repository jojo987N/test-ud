import { View, StyleSheet} from "react-native";
import { Marker } from "react-native-maps";

const CustomMarker = ({type, renderButtonColor})=>{
    
    return (
      <Marker title={type.name} description={type.address}
                coordinate={{
                  latitude: type.lat,
                  longitude:type.lng,
                }}
              >
                <View style={styles.marker}>
                  {subject.items?<Entypo name="user" size={30} color="white" />:
                  <MaterialIcons name="restaurant" size={30} color="white" />}
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
  export default CustomMarker;