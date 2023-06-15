import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "../components/Nav";
import { useState } from "react";
import { getCurrentUser } from "../sevices/firebaseAuth";
import { getAllUsersFromCollection } from "../sevices/firebaseDb";

const Profile = () => {
  const user = getCurrentUser();

  // console.log(user);

  const [profileInfo, setProfileinfo] = useState([
    {
      key: "1",
      name: "Image One",
      time: 5,
      image: require("../assets/two.png"),
    },
    {
      key: "2",
      name: "Image Two",
      time: 8,
      image: require("../assets/one.png"),
    },
    {
      key: "3",
      name: "Image Three",
      time: 19,
      image: require("../assets/three.jpg"),
    },
    {
      key: "4",
      name: "Image Three",
      time: 19,
      image: require("../assets/three.jpg"),
    },
    {
      key: "5",
      name: "Image Three",
      time: 19,
      image: require("../assets/three.jpg"),
    },
  ]);

  const [winningInfo, setWinningInfo] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      const theUsers = await getAllUsersFromCollection();

      theUsers.forEach((element) => {
        if (element.winnings && Array.isArray(element.winnings)) {
          element.winnings.forEach((entry) => {
            setWinningInfo((prevWinningInfo) => [...prevWinningInfo, entry]);
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: "black",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
          }}
          source={require("../assets/two.png")}
        />
      </View>

      <Text style={{ fontSize: 30, marginTop: 20, fontWeight: "800" }}>
        {user.displayName}
      </Text>

      {/* <Text style={{ fontSize: 20, marginTop: 10, color: "#979797" }}>
        My Balance
      </Text>

      <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "800" }}>
        ${user.balance}
      </Text> */}

      <TouchableOpacity
        style={{
          width: "40%",
          height: 40,
          backgroundColor: "#37B4FB",
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Settings
        </Text>
      </TouchableOpacity>

      <View
        style={{
          height: 3,
          width: "70%",
          backgroundColor: "#979797",
          marginTop: 30,
        }}
      ></View>

      <ScrollView
        style={{
          width: "100%",
          height: "53%",
          // backgroundColor: "green",
          marginTop: 20,
          padding: 5,
          paddingTop: 10,
        }}
      >
        {winningInfo.map((project, index) => (
          <View
            key={index}
            style={{
              width: 100,
              height: 100,
              backgroundColor: "grey",
              borderRadius: 20,
            }}
          >
            {/* <Text>{project.imageTitle}</Text> */}
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}
              source={{ uri: project.image }}
              // source={project.image}
            />
          </View>
        ))}
      </ScrollView>

      {/* <FlatList
        style={{
          width: "100%",
          height: "53%",
          // backgroundColor: "green",
          marginTop: 20,
          padding: 5,
          paddingTop: 10,
        }}
        // numColumns={6}
        contentContainerStyle={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "start",
          gap: 5,
        }}
        vertical={true}
        showsVerticalScrollIndicator={false}
        data={winningInfo}
        renderItem={({ item }) => (
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "grey",
              borderRadius: 20,
            }}
          >
            <Text>{item.imageTitle}</Text>
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}
              source={item.image}
            />
          </View>
        )}
      /> */}

      <Nav />
    </SafeAreaView>
  );
};

export default Profile;
