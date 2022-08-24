import { View, StyleSheet} from 'react-native'
import Menu from './Menu'

export const MenuButton = ({ navigation }) => {
    return (
      <View style={styles.menuButton}>
        <Menu navigation={navigation} />
      </View>
    )
  }

  const styles = StyleSheet.create({
      menuButton: { position: "absolute", top: 25, left: 10 }
  })