import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const BackButton = ({navigation}) => 
(<Ionicons 
    onPress={()=>navigation.goBack()}
    name="arrow-back-circle"
    size={45}
    color="black"
    style={styles.icon}/>
)

const styles = StyleSheet.create({
   icon: {
    position: 'absolute',
    left: 10,
    top: 10
  }
})
export default BackButton;