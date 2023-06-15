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
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { uploadToStorage } from "./firebaseStorage";

// User Collection
export const createUserInDb = async (username, email, uid) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      username,
      email,
      winnings: [],
      balance: 500,
      createdAt: Timestamp.now(),
    });
    console.log("User Added doc id: " + docRef.id);
  } catch (e) {
    console.log("Something went wrong: " + e);
  }
};

export const getAllUsersFromCollection = async () => {
  try {
    var users = [];

    const snapshot = await getDocs(
      query(
        collection(db, "users")
        // orderBy("year", "desc"),
        // orderBy("title")
      )
    );

    snapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    return users;
  } catch (e) {
    console.log("Something went wrong: " + e);
    return [];
  }
};

// Projects Collection

export const addProjectToCollection = async (project) => {
  try {
    const docRef = await addDoc(collection(db, "artworks"), project);
    console.log("Added artwork successfully", docRef.id);
    if (docRef.id) {
      await uploadToStorage(
        project.image,
        `projects/${docRef.id}_${project.title}`
      );
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

    snapshot.forEach(async (doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });

    return projects;
  } catch (e) {
    console.log("Something went wrong: " + e);
    return [];
  }
};

export const enterCompetition = async (competitor, artworkId) => {
  // console.log(
  //   "Artwork Id: " + artworkId + " Competitor Email: " + competitor.email
  // );

  const docRef = doc(db, "artworks", artworkId);

  await updateDoc(docRef, { entries: arrayUnion(competitor) })
    // await setDoc(doc(db, "artworks", "entries", competitor))
    .then(() => {
      console.log("New Competitor added successfully");
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });
};

export const removeArtworkFromDb = async (artworkId) => {
  await deleteDoc(doc(db, "artworks", artworkId));
  console.log("artwork was Deleted");
};

export const addWinningsToUser = async (userId, winningArtWork) => {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, { winnings: arrayUnion(winningArtWork) })
    .then(() => {
      console.log("Winnings added successfully");
    })
    .catch((error) => {
      console.error("Error updating winnings:", error);
    });
};
