import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import CardPost from "../components/CardPost";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";
import { getAllProjectsFromCollection } from "../sevices/firebaseDb";

const Feed = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllProjects = async () => {
    setRefreshing(true);
    console.log("Getting Data...");
    const allProjects = await getAllProjectsFromCollection();
    setProjects(allProjects);
    setRefreshing(false);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

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
  ]);

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F2F2" }}>
      <View
        style={{
          width: "100%",
          height: 80,
          // backgroundColor: "green",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {/* <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: "black",
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 5,
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={{
              width: "60%",
              height: "60%",
              // backgroundColor: "green",
            }}
            source={require("../assets/return.png")}
          />
        </TouchableOpacity> */}

        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontWeight: "800",
            textAlign: "right",
          }}
        >
          My Balence: $1000
        </Text>
      </View>

      {/* <FlatList
        style={{ width: "100%", height: "75%" }}
        // horizontal
        showsHorizontalScrollIndicator={false}
        data={projects}
        renderItem={(item) => <CardPost data={item} />}
        // keyExtractor={(item) => item.key.toString()}
      /> */}

      <View style={{ height: "80%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getAllProjects}
            />
          }
        >
          {projects.map((project, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              // onPress={() => navigation.push("Details", { project })}
            >
              <CardPost data={project} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Image
        style={{
          width: 40,
          height: 10,
          alignSelf: "center",
          marginTop: 10,
        }}
        source={require("../assets/Slider.png")}
      />

      <Nav />
    </SafeAreaView>
  );
};

export default Feed;
