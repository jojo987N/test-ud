import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { updateDriverOnOff } from '../firebase/utils'
import { APP_CONSTANT, colors, font } from '../global'
import LottieView from 'lottie-react-native'


const GoButton = () => (
  <TouchableOpacity
    onPress={() => {
      updateDriverOnOff(APP_CONSTANT.ONLINE)
    }}
    style={styles.container}>
    <View style={styles.button}>
      <Text style={styles.text}>{APP_CONSTANT.GO}</Text>
    </View>
    <LottieView style={styles.lottieView}
      source={require("../assets/animations/5709-test.json")}
      autoPlay
      speed={0.5}
      loop
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: colors.GO,
    width: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 150,
    alignSelf: "center"
  },
  button: {
    position: "absolute"
  },
  text: {
    fontWeight: font.GO,
    fontSize: 20,
    color: colors.white
  },
  lottieView: {
    height: 70,
    alignSelf: "center",
    width: 70
  },
})
export default GoButton