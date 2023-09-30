import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra?.API_KEY,
  authDomain: Constants.expoConfig.extra?.AUTH_DOMAIN,
  projectId: Constants.expoConfig.extra?.PROJECT_ID,
  storageBucket: Constants.expoConfig.extra?.STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig.extra?.MESSAGING_SENDER_ID,
  appId: Constants.expoConfig.extra?.APP_ID,
  databaseURL: Constants.expoConfig.extra?.DB_URL,
};
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();





