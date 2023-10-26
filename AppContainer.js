import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import Nav from "./components/Nav";

const AppContainer = () => {
  const [routeName, setRouteName] = useState("Login");

  return (
    <NavigationContainer
      onStateChange={(state) => {
        // Update the route name whenever the navigation state changes
        // @ts-ignore
        const currentRoute = state.routes[state.index];
        setRouteName(currentRoute.name);
      }}
    >
      {/* <TabNavigator /> */}
      <StackNavigator />

      {routeName !== "Login" &&
        routeName !== "Signup" &&
        routeName !== "Settings" && <Nav />}
      {/* <Nav /> */}
    </NavigationContainer>
  );
};

export default AppContainer;
