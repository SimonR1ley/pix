import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { Alert } from "react-native";
import { createUserInDb } from "./firebaseDb";

export const registerNewUser = async (username, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("New User: " + user);
      updateAuthProfile(username);

      await createUserInDb(username, email, user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
};

export const signinUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User logged in: " + user.email);

      // Alert.alert("You're in", "Successfully logged in", [
      //   {
      //     text: "Thank you",
      //     onPress: () => {},
      //   },
      // ]);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode + ": " + errorMessage);
      Alert.alert("Oops!", [
        {
          text: "Try again",
          onPress: () => {},
        },
      ]);
    });
};

export const signoutUser = async () => {
  await signOut(auth)
    .then(() => {
      console.log("Logged out Successfully");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const updateAuthProfile = (username, imageUrl = "") => {
  updateProfile(auth.currentUser, {
    displayName: username,
    photoURL: imageUrl,
  })
    .then(() => {
      console.log("Profile updated in Auth Successfully");
      return true;
      // Profile updated!
    })
    .catch((error) => {
      console.log("Something went wrong in Update Auth" + error);
      return false;
      // An error occurred
      // ...
    });
};
