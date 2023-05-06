import { View, Text, Image, TextInput, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonBlue } from "../components/ButtonBlue";

import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
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
          }}
          placeholder="Email"
          placeholderTextColor="white"
        />

        <TextInput
          style={{
            width: "90%",
            height: 50,
            backgroundColor: "#2A2D2E",
            borderRadius: 10,
            textAlign: "center",
          }}
          placeholder="Password"
          placeholderTextColor="white"
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

        <ButtonBlue buttonText="Login" />

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
    </SafeAreaView>
  );
};

export default Login;
