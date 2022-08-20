import firebaseApp from './config';
import {addDoc, getFirestore, collection, getDocs, doc, 
    deleteDoc, orderBy, query, limit, serverTimestamp, onSnapshot, 
    updateDoc, where} from 'firebase/firestore'
  import { LogBox } from 'react-native';
  import { getAuth } from 'firebase/auth';
  import { APP_CONSTANT } from '../global';
  
  LogBox.ignoreLogs(['Setting a timer'])
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])

export const auth = getAuth(firebaseApp)

  export const db = getFirestore()

  export const ordersCol = collection(db, 'orders')

  export const getOrdersSimple = ()=>{
   
   // const colRef = collection(db, 'orders')
    const q= query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
    const orders = []

    return getDocs(q)
    .then((snapshot) => {
       
      snapshot.docs.forEach((doc) => {

        orders.push(doc.data())
       //console.log(doc.data())
       console.log(doc.id)
      })

      return orders
       
    })
     

  }

  //getOrdersSimple()

  // Real Time

  export const getOrders1 = ()=>{

    //const colRef = collection(db, 'orders')
    const q= query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
    const orders = []

     onSnapshot(q, (snapshot)=>{

          
         snapshot.docs.forEach((doc) => {

        if(doc.data().createdAt) {

          //console.log(doc.data())
          orders.push(doc.data())
        }
       
      })
      

    })
    //return orders
   // unsuscribe()

  }

 //console.log(getOrders())

 // console.log('bb')

// CREATE COURIER

export const driversCol = collection(db, 'drivers')


const addDriver = async ()=>{
   
   const docRef = await addDoc(collection(db, "drivers"), {
     name: "",
     status: "",


   })
}

const addOrder= async ()=>{
   
  const docRef = await addDoc(collection(db, "orders"), {

    Restaurant: {
    name: "Pizza Hutttz58",
     lat: 4.071510,
     lng: 9.731240,
     address: "Los Angeles "
    },
    User: {
      name: "Jojo",
      lat: 4.068140,
      lng: 9.741590,
      phone: "134567889900",
      address: "Los Angeles",
      items : ["Big Mac", "Cheese Burger","juice"]
    },
    status: "New",
    createdAt: serverTimestamp(),



  })

  console.log(docRef.id)
}

//addOrder()

export const updateOrder = (orderId, status)=>{
  //0AiZlUQoHPIgS91AppRp
  //READY_FOR_PICKUP
  //const docRef = doc(db, 'orders', "0AiZlUQoHPIgS91AppRp")
  const docRef = doc(db, 'orders', orderId)
  
  return updateDoc(docRef, {
     
    status: status,
    driverId: auth.currentUser?.uid,
  })
  //.then(()=> console.log('good'))

}

 

//updateOrder()

const deleteOrder = ()=>{

  const docRef = doc(db, 'orders', "mxpdee9yriPV5pIE6Zbx")

   deleteDoc(docRef)
 .then(()=>{
   console.log("supprimé")
 })

}
 
//deleteOrder()

export const updateDriverOnOff =  (onOff)=>{

  const q= query(driversCol, where('Id', '==', auth.currentUser?.uid ))

   getDocs(q).then(snapshot =>{

    snapshot.docs.forEach(docc =>{

      updateDoc( doc(db, 'drivers', docc.id) , {
     
        onOff : onOff,
         
      }).then(()=> console.log('Updated'))
    })
   })

   
}

export const updateDriverLatLng =  ()=>{

  const q= query(driversCol, where('Id', '==', auth.currentUser?.uid ))

   getDocs(q).then(snapshot =>{

    snapshot.docs.forEach(docc =>{

      updateDoc( doc(db, 'drivers', docc.id) , {
     
        lat : 4.091252,
        lng: 9.741085
         
      }).then(()=> console.log('Updated'))
    })
   })

   
}

//updateDriverLatLng()

 
 

export const getDriverAvailability = ()=>{

  const q= query(driversCol, where('Id', '==', auth.currentUser?.uid ))
  
  return getDocs(q)
 // .then(snapshot =>{

    // snapshot.docs.forEach(doc =>{
       
    //   console.log(doc.data().onOff)
    // })
 // })
}

// getDriverAvailability().then(snaps =>{

//   console.log(snaps.docs[0].data().onOff)
// })

//console.log(auth.currentUser?.uid)

export const getOrders = ()=>{

  const q = query(ordersCol, where('driverId', '==', auth.currentUser?.uid ))

  
  return getDocs(q).then(snapshot => {
 
    return snapshot.docs.map((doc)=>doc.data())
  })
}

const getOrderMultipleItems = ()=>{

  getDocs(ordersCol).then(snapshot =>{
    snapshot.docs.forEach(doc =>{
     // if(doc.data().items)
      if(doc.data().User.items.length >2)
      console.log(doc.data().orderId)
    })
  })
}
//getOrderMultipleItems()

//getConfirmedOrders()

export const getDriverInfos = ()=>{

  const q= query(driversCol, where('Id', '==', auth.currentUser?.uid ))

  return getDocs(q).then(snapshot => {
 
    return snapshot.docs.map((doc)=>doc.data())
  })

}

// getDriverInfos().then(docs=> console.log({loc: {
//   latitude: docs[0].lat,
//   longitude: docs[0].lng,
// }}))


 
