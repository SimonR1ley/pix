import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonBlue } from "../components/ButtonBlue";

import { useNavigation } from "@react-navigation/native";

import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { registerNewUser } from "../sevices/firebaseAuth";

const Signup = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCon, setPasswordCon] = useState("");
  const [username, setUsername] = useState("");

  const registerUser = async () => {
    if (password != passwordCon) {
      Alert.alert("Try Again", "Passwords do not match.", [
        {
          text: "Try Again",
          onPress: () => {
            setLoading(false);
          },
        },
      ]);
    } else if (!email || !password || !username || !passwordCon) {
      Alert.alert("Try Again", "please fill in all your information.", [
        {
          text: "Try Again",
          onPress: () => {
            setLoading(false);
          },
        },
      ]);
    } else {
      console.log("Registering");
      setLoading(true);
      await registerNewUser(username, email, password).then(() => {
        setLoading(false);
        navigation.navigate("Login");
      });
    }
  };

  // console.log(auth.currentUser.email);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161616" }}>
      {!loading ? (
        <>
          <View style={{ width: "100%", height: "25%", marginBottom: 20 }}>
            <View
              style={{
                width: 160,
                height: 165,
                alignSelf: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  // backgroundColor: "green",
                }}
                source={require("../assets/logo.png")}
              />
            </View>
          </View>

          <View
            style={{
              width: "98%",
              height: "50%",
              alignSelf: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <TextInput
              style={{
                width: "90%",
                height: 50,
                backgroundColor: "#2A2D2E",
                borderRadius: 10,
                textAlign: "center",
                color: "white",
              }}
              placeholder="Username"
              placeholderTextColor="white"
              onChangeText={(newText) => setUsername(newText)}
            />

            <TextInput
              style={{
                width: "90%",
                height: 50,
                backgroundColor: "#2A2D2E",
                borderRadius: 10,
                textAlign: "center",
                color: "white",
              }}
              placeholder="Surname"
              placeholderTextColor="white"
              // onChangeText={(newText) => setSurname(newText)}
            />

            <TextInput
              style={{
                width: "90%",
                height: 50,
                backgroundColor: "#2A2D2E",
                borderRadius: 10,
                textAlign: "center",
                color: "white",
              }}
              placeholder="Email Address"
              placeholderTextColor="white"
              onChangeText={(newText) => setEmail(newText)}
            />

            <TextInput
              // secureTextEntry={true}
              style={{
                width: "90%",
                height: 50,
                backgroundColor: "#2A2D2E",
                borderRadius: 10,
                textAlign: "center",
                color: "white",
              }}
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={(newText) => setPassword(newText)}
            />

            <TextInput
              // secureTextEntry={true}
              style={{
                width: "90%",
                height: 50,
                backgroundColor: "#2A2D2E",
                borderRadius: 10,
                textAlign: "center",
                color: "white",
              }}
              placeholder="Confirm Password"
              placeholderTextColor="white"
              onChangeText={(newText) => setPasswordCon(newText)}
            />
          </View>

          <View style={{ width: "100%", height: "20%" }}>
            {/* <ButtonBlue buttonText="Signup" /> */}

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 180,
                height: 50,
                backgroundColor: "#BBFB05",
                borderRadius: 10,
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 30,
              }}
              onPress={registerUser}
            >
              <Text style={{ color: "black", fontWeight: "700", fontSize: 17 }}>
                Signup
              </Text>
            </TouchableOpacity>

            <Button
              title="Already have an account"
              color="#979797"
              style={{
                width: 100,
                height: 50,
              }}
              onPress={() => navigation.navigate("Login")}
            />
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
          <Text style={{ color: "white", textAlign: "center" }}>Loading</Text>
          <ActivityIndicator animating={loading} size={40} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Signup;
