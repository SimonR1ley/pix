import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonBlue } from "../components/ButtonBlue";

import { useNavigation } from "@react-navigation/native";
import { signinUser } from "../sevices/firebaseAuth";

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const logOn = async () => {
    setLoading(true);

    if (!email || !password) {
      Alert.alert("Try Again", "please fill in your email and password", [
        {
          text: "Try Again",
          onPress: () => {
            setLoading(false);
          },
        },
      ]);
    } else {
      await signinUser(email, password);
      setLoading(false);
      navigation.navigate("Feed");
    }
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView>
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
              height: "70%",
              alignSelf: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 20,
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
              placeholder="Email"
              placeholderTextColor="white"
              onChangeText={(newText) => setEmail(newText)}
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
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={(newText) => setPassword(newText)}
            />

            <Button
              title="Forgot Password?"
              color="#979797"
              style={{
                width: 100,
                height: 50,
              }}
              onPress={() => navigation.navigate("Login")}
            />

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 180,
                height: 50,
                backgroundColor: "#37B4FB",
                borderRadius: 10,
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 30,
              }}
              onPress={logOn}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 17 }}>
                Login
              </Text>
            </TouchableOpacity>

            <Button
              title="Signup"
              color="black"
              style={{
                width: 100,
                height: 50,
              }}
              onPress={() => navigation.navigate("Signup")}
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
          <Text style={{ color: "black", textAlign: "center" }}>Loading</Text>
          <ActivityIndicator animating={loading} size={40} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;
