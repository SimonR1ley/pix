import {
  Timestamp,
  setDoc,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

// User Collection
export const createUserInDb = async (username, email, uid) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      username,
      email,
      createdAt: Timestamp.now(),
    });
    console.log("User Added doc id: " + docRef.id);
  } catch (e) {
    console.log("Something went wrong: " + e);
  }
};

// Projects Collection

export const addProjectToCollection = async (project) => {
  try {
    const docRef = await addDoc(collection(db, "artworks"), project);
    console.log("Added project successfully", docRef.id);
    if (docRef.id) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Something went wrong: " + e);
  }
};

export const getAllProjectsFromCollection = async () => {
  try {
    var projects = [];

    const snapshot = await getDocs(
      query(
        collection(db, "artworks")
        // orderBy("year", "desc"),
        // orderBy("title")
      )
    );

    snapshot.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });

    return projects;
  } catch (e) {
    console.log("Something went wrong: " + e);
    return [];
  }
};

export const getCurrentUserProjects = async (userId) => {
  try {
    var projects = [];

    const snapshot = await getDocs(
      query(
        collection(db, "projects"),
        where("userId", "==", userId),
        orderBy("year", "desc")
      )
    );

    snapshot.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });

    return projects;
  } catch (e) {
    console.log("Something went wrong: " + e);
    return [];
  }
};
