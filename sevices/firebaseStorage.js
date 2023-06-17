import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadToStorage = async (fileUri, refName) => {
  console.log("Busy Uploading");
  const blob = await new Promise((resolve, reject) => {
    //Blob is the actual image
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", fileUri, true);
    xhr.send(null);
  });

  const uploadRef = ref(storage, refName);

  const uploadResult = await uploadBytes(uploadRef, blob);

  blob.close();

  // return getDownloadURL(uploadRef);

  const downloadURL = await getDownloadURL(uploadRef);

  return downloadURL;
};
