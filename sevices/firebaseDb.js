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
      diamonds: 1000,
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

    const snapshot = await getDocs(query(collection(db, "users")));

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
//
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
      await updateDoc(docRef, { image: imageURL });
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

export const getAllProjectsFromMarket = async () => {
  try {
    var projects = [];

    const snapshot = await getDocs(collection(db, "market"));

    snapshot.forEach((doc) => {
      const projectData = doc.data();
      const project = {
        ...projectData,
        id: doc.id,
        imageURL: projectData.image, // Assuming the field name for the image URL is 'image'
      };
      projects.push(project);

      // console.log("Project", project);
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

export const addImageToMarket = async (project) => {
  const marketRef = await addDoc(collection(db, "market"), project);
  console.log("Added artwork to market successfully", marketRef.id);
  if (marketRef.id) {
    const imageURL = await uploadToStorage(
      project.image,
      `projects/${marketRef.id}`
    );
    await updateDoc(marketRef, { image: imageURL });
  }
};

export const updateUserInDb = async (uid, userInfo) => {
  console.log("From DB", userInfo);
  try {
    await updateDoc(doc(db, "users", uid), userInfo);
  } catch (e) {
    console.log("Something went wrong with user update");
  }
};

export const updateUserFundsInDb = async (uid, funds) => {
  console.log("Added diamonds to account", funds);
  try {
    await updateDoc(doc(db, "users", uid), funds);
  } catch (e) {
    console.log("Something went wrong with funds update", e);
  }
};

export const makeOffer = async (artworkId, amount) => {
  const docRef = doc(db, "market", artworkId);

  await updateDoc(docRef, { offers: arrayUnion(amount) })
    .then(() => {
      console.log("Offer added successfully");
    })
    .catch((error) => {
      console.error("Error updating winnings:", error);
    });
};

export const updateImageOwner = async (myInfo, userInfo) => {
  console.log("My Info", myInfo.id);
  console.log("UpdateImageOwner From DB", userInfo);

  let myFunds = parseInt(myInfo.funds);
  let offerAmount = parseInt(userInfo.offerAmount);

  let newOwnerFunds = parseInt(userInfo.usersOfferFunds);

  const newOwnerUpdateAmount = newOwnerFunds - offerAmount;
  const myUpdateAmount = myFunds + offerAmount;
  console.log(myUpdateAmount);

  await updateUserFundsInDb(myInfo.id, { diamonds: myUpdateAmount });

  try {
    const updateMarketDoc = updateDoc(doc(db, "market", userInfo.artworkId), {
      winningUserName: userInfo.username,
      winningUserId: userInfo.userId,
    });

    const updateUserFunds1 = updateUserFundsInDb(myInfo.id, {
      diamonds: myUpdateAmount,
    });
    const updateUserFunds2 = updateUserFundsInDb(userInfo.userId, {
      diamonds: newOwnerUpdateAmount,
    });

    await Promise.all([updateMarketDoc, updateUserFunds1, updateUserFunds2]);

    await removeOffers(userInfo);
  } catch (e) {
    console.log("Something went wrong with user update");
  }

  // try {
  //   await updateDoc(doc(db, "market", userInfo.artworkId), {
  //     winningUserName: userInfo.username,
  //     winningUserId: userInfo.userId,
  //   }).then(async () => {
  //     await updateUserFundsInDb(myInfo.id, myUpdateAmount);
  //     // .then(async () => {
  //     //   await updateUserFundsInDb(userInfo.userId, newOwnerUpdateAmount);
  //     //   // .then(
  //     //   //   async () => {
  //     //   //     // await removeOffers(userInfo);
  //     //   //   }
  //     //   // );
  //     // });
  //     //
  //   });
  // } catch (e) {
  //   console.log("Something went wrong with user update", e);
  // }
};

export const removeOffers = async (offers) => {
  console.log("offer remove Information: ", offers);

  const myDocRef = doc(db, "market", offers.artworkId);
  try {
    await updateDoc(myDocRef, {
      offers: [],
    });
    console.log("All offers removed successfully.");
  } catch (error) {
    console.error("Error removing offers:", error);
  }
};
