import firebaseApp from "./FirebaseApp";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

//class that handles all the firebase authentification
class FirebaseAuth {
  auth = () => {
    return getAuth(firebaseApp());
  };
  //gives you the current user
  getCurrentUser = () => {
    return this.auth().currentUser;
  };
  //create an account
  createUser = (email, password) => {
    return createUserWithEmailAndPassword(this.auth(), email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  // will attempt to log in a user
  login = (email, password) => {
    return signInWithEmailAndPassword(this.auth(), email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  // will call back when we update auth state
  onAuthStateChange = (callback) => {
    return onAuthStateChanged(this.auth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
      callback(user);
    });
  };
}

export default FirebaseAuth;
