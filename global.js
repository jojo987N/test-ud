import { Dimensions } from "react-native"
import { LogBox } from 'react-native';


export const currency = "$"
export const grey1 = "#e6e6e6"
export const apikey={/* Your Google Api Here */}
export const APP_CONSTANT = {
    TEXT: {
    
        YOU_ARE: "You're",
        ONLINE: "online",
        OFFLINE: "offline",
        PICK_UP: "Pick-Up Order",
        FINISH: "Finish",
        UPLOAD_PHOTO: "Upload Photo",
        TAKE_A_PHOTO: "Take a Photo",
        CHOOSE_FROM_LIBRARY: "Choose From Library",
        CANCEL: "Cancel",
        UPLOAD_IMAGE: "Upload Image",
        RESTAURANT_NAME: "Restaurant Name",
        UPDATE: "Update",
        PERMISSION_TO_CAMERA: "Permission to acces camera roll is required",
        GRANTED: "granted",
        PERMISSION_TO_LOCATION_DENIED: 'Permission to access location was denied',
        OFF: "OFF",
        GO: "GO",
        HOME: "Home",
        HISTORY: "history",
        TOTAL_REVENUE: "TOTAL REVENUE",
        TOTAL_PROFIT: "TOTAL PROFIT",
        ORDER_ID: "Order Id",
        STARTED_ORDERS: "Started Orders",
        COMPLETED: "Completed",
        CANCELED: "Canceled",
        ORDERS_CONFIRMED: "Orders Confirmed",
        ORDERS_PICKED_UP: "Orders Picked Up",
        ORDERS_COMPLETED: "Orders Completed",
        ORDERS_CANCELED: "Orders Canceled",
        MY_LOCATION: "My Location",
        SETTINGS: "Settings"
         
    },
    STATUS: {
        CONFIRMED: "confirmed",
        STARTED_ORDER : "Start Delivery",
        ACCEPTED: "ACCEPTED",
        CANCELED: "CANCELED",
        INPROGRESS: "InProgress",
        PICKED_UP: "PICKED_UP",
        COMPLETED: "Completed", 
    }
}

export const colors = {
    buttons: "black",
    grey1: "#43484d",
    grey2: "#5e6977",
    green2: "#008000",
    white: "#ffffff",
    black: "#000000",
    cardComment: "#86939e",
    cardbackground: 'white',
    statusbar: '#ff8c52',
    headerText: 'white',
    GO: "blue",
    ORDER_CONFIRMED: "#008000",
    STARTED_ORDER : "#ffa500",
    ORDER_CANCELED: "#ff0000",
    ORDER_INPROGRESS: "#a52a2a",
    ORDER_PICKED_UP: "#511515",
    ORDER_COMPLETED: "#0000ff",
    ADDRESS: "grey",
    CHECK: "white",
    handleIndicatorStyle: "grey"
}

export const icon = {
    restaurant: "shop",
    HOME: "home",
    ORDER_CONFIRMED: "check",
    STARTED_ORDER : "check",
    ORDER_CANCELED: "check",
    ORDER_INPROGRESS: "check",
    ORDER_PICKED_UP: "check",
    ORDER_COMPLETED: "check",
    USER_MARKER: "user",
    RESTAURANT_MARKER: "restaurant",
    HISTORY: "history",
    DRAWER_ORDER_CONFIRMED: "confirmation-num",
    DRAWER_STARTED_ORDERS: "hourglass-start",
    DRAWER_ORDERS_PICKED_UP: "delivery-dining",
    DRAWER_ORDERS_COMPLETED: "checkcircle",
    DRAWER_ORDERS_CANCELED: "cancel",
    MY_LOCATION: "location",
    DRAWER_SETTINGS: "cog-outline"
     
}

export const font = {
    GO: "bold"
}

export const NOTIFICATION_TIME = 15;

export const screen = {
    ORDER_CONFIRMED_DETAILS: "OrderConfirmedDetails",
    ORDER_PICKED_UP_DETAILS: "OrderPickedUpDetails",
    STARTED_ORDER_DETAILS: "StartedOrderDetails",
    ORDER_COMPLETED_DETAILS: "OrdercompletedDetails",
    ORDER_CANCELED_DETAILS: "OrderCanceledDetails",
    SIGN_IN: "SignIn",
    DRAWER_NAVIGATOR: "DrawerNavigator",
    ORDERS_SCREEN: "OrdersScreen",
    ORDER_DELIVERY: "OrderDelivery",
    HOME: "Home",
    HISTORY: "History",
    ORDERS_CONFIRMED: "OrdersConfirmed",
    STARTED_ORDERS: "Started Orders",
    ORDERS_PICKED_UP: "OrdersPickedUp",
    ORDERS_COMPLETED: "OrdersCompleted",
    ORDERS_CANCELED: "OrdersCanceled",
    SETTINGS: "Settings"
   
}
export const ANIMATION = {
    LOADING : require("../assets/animations/waiting.json")
}
export const delta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
export const _bottomSheet = {
    snapPoints: ["12%", "95%"]
}
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])

