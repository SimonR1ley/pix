import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import React from "react";
import Nav from "../components/Nav";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { addProjectToCollection } from "../sevices/firebaseDb";
import { getCurrentUser } from "../sevices/firebaseAuth";

const Post = ({ navigation }) => {
  const [uploading, setUploading] = useState(false);

  const [imageTitle, setImageTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [cost, setCost] = useState(null);

  const [loading, setLoading] = useState(false);

  const createProject = async () => {
    if (imageTitle && description && image) {
      setLoading(true);
      var ownerInfo = getCurrentUser();

      var project = {
        imageTitle,
        description,
        owner: ownerInfo.displayName,
        userId: ownerInfo.uid,
        uploadedAt: Date(),
        image,
        entries: [],
        ownerEmail: ownerInfo.email,
      };

      const success = await addProjectToCollection(project);
      if (success) {
        setLoading(false);
        console.log("Added project Successfully");
        navigation.goBack();
      } else {
        setLoading(false);
        console.log("Opps... adding project went wrong");
        Alert.alert("Oops", "adding project went wrong");
      }
    } else {
      Alert.alert("Oops", "Please add all user information.");
    }
  };

  const pickImageFromLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F2F2" }}>
      <View
        style={{
          width: "100%",
          height: 80,
          display: "flex",
          justifyContent: "center",
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
            position: "absolute",
            left: 25,
          }}
          onPress={() => {
            navigation.navigate("Feed");
          }}
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

        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Post Artwork
        </Text>
      </View>

      {!loading ? (
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
            onChangeText={(newText) => setImageTitle(newText)}
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
              onPress={pickImageFromLibrary}
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
              height: 80,
              backgroundColor: "#2A2D2E",
              borderRadius: 10,
              color: "white",
              textAlign: "center",
              marginTop: 20,
            }}
            placeholder="Description"
            placeholderTextColor="white"
            onChangeText={(newText) => setDescription(newText)}
          />
          {/* <TextInput
            style={{
              width: "50%",
              height: 40,
              backgroundColor: "#2A2D2E",
              borderRadius: 10,
              color: "white",
              textAlign: "center",
              marginTop: 20,
            }}
            placeholder="Cost of Image"
            placeholderTextColor="white"
            onChangeText={(newText) => setCost(newText)}
          /> */}
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
            // onPress={uploadImage}
            onPress={createProject}
          >
            <Text style={{ color: "white" }}>Upload</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          <Text style={{ color: "black", textAlign: "center" }}>Loading</Text>
          <ActivityIndicator animating={loading} size={40} />
        </View>
      )}

      <Nav />
    </SafeAreaView>
  );
};

export default Post;
