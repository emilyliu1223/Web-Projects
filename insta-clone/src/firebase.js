import firebase from "firebase";


  const firebaseApp=firebase.initializeApp(
      {
        apiKey: "AIzaSyCxjaVNSUqBzukrjemNa4G1_VijP0lMmZo",
        authDomain: "react-instagram-c11f1.firebaseapp.com",
        databaseURL: "https://react-instagram-c11f1.firebaseio.com",
        projectId: "react-instagram-c11f1",
        storageBucket: "react-instagram-c11f1.appspot.com",
        messagingSenderId: "975741413133",
        appId: "1:975741413133:web:50a9c0b6e121db4e7bb244",
        measurementId: "G-HQ5J9HD564"
      }
  );
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export{db,auth,storage};