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

// export const addProjectToCollection = async (project) => {
//   try {
//     const docRef = await addDoc(collection(db, "artworks"), project);
//     console.log("Added artwork successfully", docRef.id);
//     if (docRef.id) {
//       await uploadToStorage(project.image, `projects/${docRef.id}`);
//       return true;
//     } else {
//       return false;
//     }
//   } catch (e) {
//     console.log("Something went wrong: " + e);
//   }
// };

export const addProjectToCollection = async (project) => {
  try {
    const docRef = await addDoc(collection(db, "artworks"), project);
    console.log("Added artwork successfully", docRef.id);
    if (docRef.id) {
      const imageURL = await uploadToStorage(
        project.image,
        `projects/${docRef.id}`
      );
      await updateDoc(docRef, { image: imageURL }); // Assuming the field name for the image URL is 'image'
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Something went wrong: " + e);
  }
};

// export const getAllProjectsFromCollection = async () => {
//   try {
//     var projects = [];

//     const snapshot = await getDocs(
//       query(
//         collection(db, "artworks")
//         // orderBy("year", "desc"),
//         // orderBy("title")
//       )
//     );

//     snapshot.forEach((doc) => {
//       projects.push({ ...doc.data(), id: doc.id });
//     });

//     return projects;
//   } catch (e) {
//     console.log("Something went wrong: " + e);
//     return [];
//   }
// };

export const getAllProjectsFromCollection = async () => {
  try {
    var projects = [];

    const snapshot = await getDocs(collection(db, "artworks"));

    snapshot.forEach((doc) => {
      const projectData = doc.data();
      const project = {
        ...projectData,
        id: doc.id,
        imageURL: projectData.image, // Assuming the field name for the image URL is 'image'
      };
      projects.push(project);
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

export const updateUserInDb = async (userInfo, uid) => {
  try {
    const docRef = await updateDoc(doc(db, "users", uid), userInfo);
  } catch (e) {
    console.log("Something went wrong with user update");
  }
};
