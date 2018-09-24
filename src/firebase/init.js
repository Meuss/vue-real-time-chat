import firebase from 'firebase/app';
/* eslint-disable-next-line */
import firestore from 'firebase/firestore';
// Initialize Firebase
const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'vue-real-time-chat-28d95.firebaseapp.com',
  databaseURL: 'https://vue-real-time-chat-28d95.firebaseio.com',
  projectId: 'vue-real-time-chat-28d95',
  storageBucket: 'vue-real-time-chat-28d95.appspot.com',
  messagingSenderId: '176173337265',
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
