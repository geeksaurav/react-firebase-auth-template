import app from "firebase/app";
// eslint-disable-next-line
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDz54za_Fht_PNM4jhFsxvhDuP4xQu_DSg",
  authDomain: "react-firebase-auth-temp.firebaseapp.com",
  databaseURL: "https://react-firebase-auth-temp.firebaseio.com",
  projectId: "react-firebase-auth-temp",
  storageBucket: "react-firebase-auth-temp.appspot.com",
  messagingSenderId: "814457360561",
  appId: "1:814457360561:web:0872a03bd8d64adb0f9290",
  measurementId: "G-RYELS3CLFP"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  // ! *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => {
    return this.auth.signOut();
  };

  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password);
  };

  // ! *** User Api *** Not really up for this but anyways

  // user = uid => this.db.ref(`users/${uid}`);

  // users = () => this.db.ref("users");
}

export default Firebase;
