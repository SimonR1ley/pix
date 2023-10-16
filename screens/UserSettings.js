import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  getCurrentUser,
  signoutUser,
  updateAuthProfile,
} from "../sevices/firebaseAuth";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { updateUserInDb } from "../sevices/firebaseDb";
import { uploadToStorage } from "../sevices/firebaseStorage";

const UserSettings = ({ navigation }) => {
  const user = getCurrentUser();

  const [username, setUsername] = useState(user.displayName);
  const [profileUrl, setProfileUrl] = useState(user.photoURL);
  const [email, setEmail] = useState(user.email);

  const [loading, setLoading] = useState(false);

  // const updateProfileInformation = async () => {
  //   //update profile information

  //   setLoading(true);

  //   var uploadedImageUrl = null;

  //   if (profileUrl != user.photoURL) {
  //     const uploadedImageUrl = await uploadToStorage(
  //       profileUrl,
  //       `users/${user.uid}`
  //     );
  //   }

  //   const authSuccess = updateAuthProfile(
  //     username,
  //     uploadedImageUrl ? uploadedImageUrl : profileUrl
  //   );
  //   await updateUserInDb(user.uid, {
  //     username,
  //     profileUrl: uploadedImageUrl ? uploadedImageUrl : profileUrl,
  //     email,
  //   }).then(() => {
  //     setLoading(false);
  //     navigation.navigate("Feed");
  //   });
  // };

  const updateProfileInformation = async () => {
    setLoading(true);

    let uploadedImageUrl = null;

    if (profileUrl !== user.photoURL) {
      uploadedImageUrl = await uploadToStorage(profileUrl, `users/${user.uid}`);
    }

    const authSuccess = await updateAuthProfile(
      username,
      uploadedImageUrl ? uploadedImageUrl : profileUrl
    );

    await updateUserInDb(user.uid, {
      username,
      profileUrl: uploadedImageUrl ? uploadedImageUrl : profileUrl,
      email,
    });

    setLoading(false);
    navigation.navigate("Feed");
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
      setProfileUrl(result.assets[0].uri);
    }
  };

  const signingOut = () => {
    signoutUser();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#161616",
        height: "100%",
        flex: 1,
      }}
    >
      {!loading ? (
        <>
          <View
            style={{
              width: "100%",
              height: 80,
              // backgroundColor: "green",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "white",
                fontWeight: "800",
                position: "absolute",
                alignSelf: "center",
                textAlign: "center",
                width: "100%",
                // backgroundColor: "red",
              }}
            >
              {/* My Balence: $1000 */}
              Settings
            </Text>
            {/* <TouchableOpacity
              style={{
                marginLeft: 20,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ fontSize: 17, color: "white" }}>Back</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                // backgroundColor: "red",
                marginLeft: 20,
                borderRadius: 100,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                source={require("../assets/return.png")}
                style={{ width: "100%", height: "100%", borderRadius: 100 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              backgroundColor: "black",
            }}
            onPress={() => pickImageFromLibrary()}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
              }}
              source={{ uri: profileUrl }}
            />
          </TouchableOpacity>

          <View
            style={{
              width: "85%",
              height: "55%",
              backgroundColor: "#rgba(52, 52, 52, 0.01)",
              // backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              borderRadius: 15,
              // shadowOffset: { width: 0, height: 0 },
              // shadowColor: "#171717",
              // shadowOpacity: 0.5,
              // shadowRadius: 5,
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                color: "white",
              }}
            >
              Username
            </Text>
            <TextInput
              placeholder={user.displayName}
              style={{
                backgroundColor: "#2A2D2E",
                width: "90%",
                height: 40,
                paddingLeft: 15,
                borderRadius: 10,
                color: "white",
              }}
              placeholderTextColor="white"
              onChangeText={(newText) => setUsername(newText)}
            />

            <Text
              style={{
                marginTop: 30,
                marginBottom: 10,
                color: "white",
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder={user.email}
              style={{
                backgroundColor: "#2A2D2E",
                width: "90%",
                height: 40,
                paddingLeft: 15,
                borderRadius: 10,
                color: "white",
              }}
              placeholderTextColor="white"
              onChangeText={(newText) => setEmail(newText)}
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#BBFB05",
                width: "48%",
                height: 35,
                borderRadius: 10,
                marginTop: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={updateProfileInformation}
            >
              <Text style={{ color: "black", fontWeight: "600", fontSize: 18 }}>
                Update
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                // backgroundColor: "#CC4949",
                width: "40%",
                height: 35,
                borderRadius: 10,
                marginTop: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={signingOut}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", textAlign: "center" }}>Loading</Text>
          <ActivityIndicator animating={loading} size={40} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserSettings;

const styles = StyleSheet.create({});
