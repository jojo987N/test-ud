import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, { createElement } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { dashboardItems } from '../global/data';

export default function Dashboard({navigation}) {
 return (
   <View style={styles.container}>
   <View style={styles.container2}>
        <Total title={`TOTAL REVENUE`} value="$32,575"/>
        <Total title={`TOTAL PROFIT`} value="$20,590"/>
    </View>
   <FlatList 
   data={dashboardItems}
    keyExtractor={(item, index)=>String(index)}
    renderItem={({item})=>{
      return (
        <TouchableOpacity onPress={()=>{
          navigation.navigate('DrawerNavigator', {screen: item.label})
       }} 
        style={styles.iconContainer}>
        {createElement(item.icon.type, {
          name: item.icon.name,
         size: 34,
        color: "#8080ff"
       }, null)}
         <Text style={styles.textIcon}>{item.label}</Text>
     </TouchableOpacity>
      )
    }}
    numColumns={2}
    key={2}
    />
   </View>
 )
}

const Total = ({title, value})=>{
    return(
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{title}</Text>
          <Text style={styles.totalValue}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
   alignItems: "center"
    },
    container2: {
      flexDirection: "row",
      marginHorizontal: 10,
      marginVertical: 10
    },
    totalContainer : {
     borderWidth: 1,
      borderColor: "#d9d9d9",
     flex: 1,
      marginHorizontal: 5,
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 20
   },
    totalText: {
        fontWeight: "bold",
        color: "grey",
        marginBottom: 10
    },
    totalValue: {
        color: "#8080ff",
        fontWeight: "bold"
    },
    iconContainer: {
      borderWidth: 1,
      marginHorizontal: 5,
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 15,
     width: 178,
      marginBottom: 10,
      borderColor: "#d9d9d9",
    },
    textIcon: {
      fontWeight: "bold",
      color: "grey"
    }
})


