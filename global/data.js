import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors } from "react-native-elements";
import { APP_CONSTANT, icon } from "../global";

 export const dashboardItems = [
    {
     label: APP_CONSTANT.HOME,
     icon: {
       type: Entypo,
       name: icon.HOME,
       size: 24,
       color: colors.black
     },
    },
    {
     label: APP_CONSTANT.HISTORY,
     icon: {
       type: FontAwesome,
       name: "history",
       size: 24,
       color: "black"
     },
    },
    {
     label: "Stats",
     icon: {
       type: Ionicons,
       name: "stats-chart",
       size: 24,
       color: "black"
     },
    },
    {
     label: "Orders",
     icon: {
       type: Entypo,
       name: "calendar",
       size: 24,
       color: "black"
     }
    },
   
]


 
  

  
   
  

  
  
  
  
  
  
  


  
 
  
  
  
  
  

  