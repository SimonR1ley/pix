import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Nav = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "90%",
        height: 50,
        backgroundColor: "#212121",
        alignSelf: "center",
        position: "absolute",
        top: 830,
        borderRadius: 30,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        style={{ width: 30, height: "60%" }}
        onPress={() => navigation.navigate("Feed")}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            // backgroundColor: "green",
          }}
          source={require("../assets/Find.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ width: 36, height: "72%" }}
        onPress={() => navigation.navigate("Post")}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            // backgroundColor: "green",
          }}
          source={require("../assets/Post.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ width: 30, height: "60%" }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            // backgroundColor: "green",
          }}
          source={require("../assets/Collection.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Nav;
