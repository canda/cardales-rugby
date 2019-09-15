import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCSec4xEiawwcV-tINpBLysKAZxOkpK6Kk',
  authDomain: 'cardales-rugby.firebaseapp.com',
  databaseURL: 'https://cardales-rugby.firebaseio.com',
  projectId: 'cardales-rugby',
  storageBucket: 'cardales-rugby.appspot.com',
  messagingSenderId: '281044045627',
  appId: '1:281044045627:web:9696f1d087686edb'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const accounts = firestore.collection('accounts');
