import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Pressable, StyleSheet} from "react-native";
import { APP_CONSTANT } from "../global";

export default function OrderItem({order, location}) {
  const navigation = useNavigation()
  console.log(order.User.items[0].restaurant.image)
  return (
      <Text>Bonjour</Text>
  );
}
const color = (status)=>{
  switch (status) {
    case APP_CONSTANT.CANCELED:
      return "red"
    case APP_CONSTANT.START_DELIVERY:
      return "orange"
    case APP_CONSTANT.PICKED_UP:
      return "#996300"
    case APP_CONSTANT.COMPLETED:
      return "blue"
    default:
        return "green"
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10
  },
   image: {
    width: "25%", height: "100%", 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  user_restaurant_infos: {
    flex: 1,
    padding : 10,
},
})
