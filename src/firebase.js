// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
//import {cityDb} from './temp/m-city-export'

const firebaseConfig = {
  apiKey: "AIzaSyAO5iK2iuw0fTCzh6cccryrnCpUCnr7wxQ",
  authDomain: "mcity-10982.firebaseapp.com",
  projectId: "mcity-10982",
  storageBucket: "mcity-10982.appspot.com",
  messagingSenderId: "858784386975",
  appId: "1:858784386975:web:7eee09a09c8a941440f7aa",
  measurementId: "G-YKHGQ4RNRM"
};

firebase.initializeApp(firebaseConfig)

const DB = firebase.firestore()
const matchesCollection = DB.collection('matches')
const playersCollection=DB.collection('players')
const positionsCollection=DB.collection('positions')
const promotionsCollection=DB.collection('promotions')
const teamsCollection=DB.collection('teams')
/*
cityDb.matches.forEach(item => {
  matchesCollection.add(item)
})
*/

/*
cityDb.players.forEach(item => {
  playersCollection.add(item)
})
*/
/*
cityDb.positions.forEach(item => {
  positionsCollection.add(item)
})
*/
/*
cityDb.promotions.forEach(item => {
  promotionsCollection.add(item)
})
*/
/*
cityDb.teams.forEach(item => {
  teamsCollection.add(item)
})
*/
export {
    firebase,
    matchesCollection,
    playersCollection,
    positionsCollection,
    promotionsCollection,
    teamsCollection
}