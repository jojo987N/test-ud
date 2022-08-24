import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import { updateDriverOnOff } from '../firebase/utils'
import { APP_CONSTANT } from '../global'

const OffButton = () => (
    <TouchableOpacity
      onPress={() => {
        updateDriverOnOff(APP_CONSTANT.OFFLINE)
      }}
      style={styles.offButton}>
      <Text style={styles.offButtonText}>{APP_CONSTANT.OFF}</Text>
    </TouchableOpacity>
  )

  const styles = StyleSheet.create({
    offButton: {
        backgroundColor: "red",
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 20
      },
      offButtonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white"
      },
  })

  export default OffButton 