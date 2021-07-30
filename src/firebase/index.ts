/* eslint-disable @typescript-eslint/no-non-null-assertion */
import firebase from 'firebase';
import 'firebase/firestore';

import Constants from 'expo-constants';

export default () => {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: Constants.manifest.extra!.API_KEY,
    authDomain: Constants.manifest.extra!.AUTH_DOMAIN,
    databaseURL: Constants.manifest.extra!.DATABASE_URL,
    projectId: Constants.manifest.extra!.PROJECT_ID,
    storageBucket: Constants.manifest.extra!.STORAGE_BUCKET,
    messagingSenderId: Constants.manifest.extra!.MESSAGING_SENDER_ID,
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  return db;
};
