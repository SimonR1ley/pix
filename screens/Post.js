import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import React from "react";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const Post = () => {
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setImage(null);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(`Pictures/Image1`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          setImage(url);
          blob.close();
          return url;
        });
      }
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F2F2" }}>
      <View
        style={{
          width: "100%",
          height: 80,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#212121",
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 5,
          }}
          onPress={() => navigation.navigate("Feed")}
        >
          <Image
            style={{
              width: "60%",
              height: "60%",
              // backgroundColor: "green",
            }}
            source={require("../assets/return.png")}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: 410,
          height: 600,
          backgroundColor: "#F2F2F2",
          alignSelf: "center",
          borderRadius: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
          marginTop: "10%",
        }}
      >
        <TextInput
          style={{
            width: "80%",
            height: 40,
            backgroundColor: "#2A2D2E",
            borderRadius: 10,
            color: "white",
            marginBottom: 20,
            textAlign: "center",
          }}
          placeholder="Name of Image"
          placeholderTextColor="white"
        />

        <View
          style={{
            width: "90%",
            height: "60%",
            backgroundColor: "#4A4A4A",
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            // onPress={() => navigation.navigate("Feed")}
            onPress={pickImage}
          >
            {/* <Image
              style={{
                width: "60%",
                height: "60%",
                // backgroundColor: "green",
              }}
              source={require("../assets/add_story.png")}
            /> */}

            {image !== null ? (
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 30,
                  // backgroundColor: "green",
                }}
                source={{ uri: image }}
              />
            ) : (
              <Image
                style={{
                  width: "30%",
                  height: "30%",

                  // backgroundColor: "green",
                }}
                source={require("../assets/add_story.png")}
              />
            )}
          </TouchableOpacity>
        </View>

        <TextInput
          style={{
            width: "80%",
            height: 40,
            backgroundColor: "#2A2D2E",
            borderRadius: 10,
            color: "white",
            textAlign: "center",
            marginTop: 20,
          }}
          placeholder="Description"
          placeholderTextColor="white"
        />

        {!uploading && image ? (
          <TouchableOpacity
            title="View"
            style={{
              width: "50%",
              height: 40,
              backgroundColor: "#37B4FB",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={uploadImage}
          >
            <Text style={{ color: "white" }}>Upload</Text>
          </TouchableOpacity>
        ) : // <ActivityIndicator size={"small"} color="black" />
        null}
      </View>

      <Nav />
    </SafeAreaView>
  );
};

export default Post;
