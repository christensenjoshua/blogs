import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firestore = firebaseApp.firestore()
const settings = {
    timestampsInSnapshots: false
}

firestore.settings(settings)

export default firestore