import firebaseApp from './config';
import { addDoc, getFirestore, collection, getDocs, doc, deleteDoc, orderBy, query, limit, serverTimestamp, onSnapshot, updateDoc, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

export const auth = getAuth(firebaseApp)
export const db = getFirestore()
export const ordersCol = collection(db, 'orders')
export const driversCol = collection(db, 'drivers')
export const getOrdersSimple = async () => {
    const q = query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
    const orders = []
    return getDocs(q)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                orders.push(doc.data())
                console.log(doc.id)
            })
            return orders
        })
}
export const getOrders1 = () => {
    const q = query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
    const orders = []
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            if (doc.data().createdAt) {
                orders.push(doc.data())
            }
        })
    })
}

export const updateOrder = (orderId, status) => {
    const docRef = doc(db, 'orders', orderId)
    return updateDoc(docRef, {
        status: status,
        driverId: auth.currentUser?.uid,
    })
}
export const updateDriverOnOff = (onOff) => {
    const q = query(driversCol, where('Id', '==', auth.currentUser?.uid))
    getDocs(q).then(snapshot => {
        snapshot.docs.forEach(docc => {
            updateDoc(doc(db, 'drivers', docc.id), {
                onOff: onOff,
            }).then(() => console.log('Updated'))
        })
    })
}
export const updateDriverLatLng = () => {
    const q = query(driversCol, where('Id', '==', auth.currentUser?.uid))
    getDocs(q).then(snapshot => {
        snapshot.docs.forEach(docc => {
            updateDoc(doc(db, 'drivers', docc.id), {
                lat: 4.091252,
                lng: 9.741085
            }).then(() => console.log('Updated'))
        })
    })
}
export const getDriverAvailability = () => {
    const q = query(driversCol, where('Id', '==', auth.currentUser?.uid))
    return getDocs(q)
}
export const getOrders = () => {
    const q = query(ordersCol, where('driverId', '==', auth.currentUser?.uid))
    return getDocs(q).then(snapshot => {
        return snapshot.docs.map((doc) => doc.data())
    })
}
const getOrderMultipleItems = () => {
    getDocs(ordersCol).then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().User.items.length > 2)
                console.log(doc.data().orderId)
        })
    })
}
export const getDriverInfos = () => {
    const q = query(driversCol, where('Id', '==', auth.currentUser?.uid))
    return getDocs(q).then(snapshot => {
        return snapshot.docs.map((doc) => doc.data())
    })
}
