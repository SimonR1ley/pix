import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Feed from "./screens/Feed";
import Individual from "./screens/Individual";
import Post from "./screens/Post";
import Profile from "./screens/Profile";
import Press from "./screens/Press";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Press" component={Press} />
      <Stack.Screen name="Individual" component={Individual} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNavigator;
