import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Feed from "./screens/Feed";
import Individual from "./screens/Individual";
import Post from "./screens/Post";
import Profile from "./screens/Profile";
import Press from "./screens/Press";
import Competitors from "./screens/Competitors";
import UserSettings from "./screens/UserSettings";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [loggedIn, setLoggedIn] = useState(false); //variable to view screens for auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("checking if logged In...");
      if (user) {
        //user is logged in
        setLoggedIn(true);
      } else {
        //user doesn't exist, meaning they are logged out
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      {!loggedIn ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      ) : (
        <>
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Competitors" component={Competitors} />
          <Stack.Screen name="Press" component={Press} />
          <Stack.Screen name="Individual" component={Individual} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Settings" component={UserSettings} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNavigator;
