import firebase from 'firebase';


const firebaseApp=firebase.initializeApp({
   
        apiKey: "AIzaSyAoRl0GTFn_quGBhti9pPmipHCzfvBobP0",
        authDomain: "messenger-d870f.firebaseapp.com",
        databaseURL: "https://messenger-d870f.firebaseio.com",
        projectId: "messenger-d870f",
        storageBucket: "messenger-d870f.appspot.com",
        messagingSenderId: "507929731930",
        appId: "1:507929731930:web:e8e050af94a5f12f444963",
        measurementId: "G-9E1KY1TW8L"
   
});
const db=firebaseApp.firestore();

export default db;
