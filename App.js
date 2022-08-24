import { SafeAreaView, StatusBar, StyleSheet} from "react-native";
import RootNavigation from "./navigation/navigation";

export default function App() {
  return (
      <SafeAreaView 
        style={styles.container}>
      <RootNavigation />
       </SafeAreaView>
  );
}
const styles = StyleSheet.create({
   container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})
