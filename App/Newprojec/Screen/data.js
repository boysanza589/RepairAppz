import firebase from 'firebase/compat'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCpmrEhx0K0Db8xrnFZbIYuHHtQQVniUNM",
  authDomain: "testpj-7c9f9.firebaseapp.com",
  projectId: "testpj-7c9f9",
  storageBucket: "testpj-7c9f9.appspot.com",
  messagingSenderId: "1032964628062",
  appId: "1:1032964628062:web:19fb3535453b671a339ecf"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export {firebase};



