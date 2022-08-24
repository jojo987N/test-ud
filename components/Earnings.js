import { View, Text, StyleSheet} from 'react-native'
import {currency} from '../global'


const Earnings = ({ earnings }) => {
    return (
      <View style={styles.earnings}>
        <Text style={styles.earningsText}>
          <Text style={styles.currency}>{currency}</Text> {earnings} </Text>
      </View>
    )
  }

  const styles = StyleSheet.create({

    earnings: {
        position: "absolute",
        backgroundColor: "black",
        alignSelf: "center",
        borderRadius: 20,
        marginTop: 20
      },
      earningsText: {
        color: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 25
      },
      currency: {
        color: "#1a8cff"
      },
  })

  export default Earnings