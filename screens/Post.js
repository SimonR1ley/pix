import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";

const Post = () => {
  const navigation = useNavigation();
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
              width: "50%",
              height: "50%",
              // backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Feed")}
          >
            <Image
              style={{
                width: "60%",
                height: "60%",
                // backgroundColor: "green",
              }}
              source={require("../assets/add_story.png")}
            />
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
        >
          <Text style={{ color: "white" }}>Upload</Text>
        </TouchableOpacity>
      </View>

      <Nav />
    </SafeAreaView>
  );
};

export default Post;
