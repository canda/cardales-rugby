// We import and initialize firebase asynchronously to avoid gatsby build errors
// https://kyleshevlin.com/firebase-and-gatsby-together-at-last

const firebaseConfig = {
  apiKey: 'AIzaSyCSec4xEiawwcV-tINpBLysKAZxOkpK6Kk',
  authDomain: 'cardales-rugby.firebaseapp.com',
  databaseURL: 'https://cardales-rugby.firebaseio.com',
  projectId: 'cardales-rugby',
  storageBucket: 'cardales-rugby.appspot.com',
  messagingSenderId: '281044045627',
  appId: '1:281044045627:web:9696f1d087686edb'
};

let firestoreInstance;
const getFirestoreInstance = () => {
  if (firestoreInstance) {
    return Promise.resolve(firestoreInstance);
  }
  const lazyApp = import('firebase/app');
  const lazyDatabase = import('firebase/firestore');

  return Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    return firebase.firestore();
  });
};

export const getAccountsRef = async () => {
  const firestore = await getFirestoreInstance();
  return firestore.collection('accounts');
};
