import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCLRR3g4q8qsu3Yrz2zn8PYA6qVLnM5ZRU',
  authDomain: 'vuelessons.firebaseapp.com',
  databaseURL: 'https://vuelessons.firebaseio.com',
  projectId: 'vuelessons',
  storageBucket: 'vuelessons.appspot.com',
  messagingSenderId: '553773218131',
  appId: '1:553773218131:web:6e9abce8cf7f6a1bac09a6',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.storage();
export const auth = firebase.auth();
