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
import { getAllProjectsFromCollection } from "../sevices/firebaseDb";
import { getCurrentUser } from "../sevices/firebaseAuth";

const Feed = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [entered, setEntered] = useState(false);

  const user = getCurrentUser();

  iconimage = require("../assets/entries.png");

  const getAllProjects = async () => {
    setRefreshing(true);
    // console.log("Getting Data...");
    const allProjects = await getAllProjectsFromCollection();
    setProjects(allProjects);
    setRefreshing(false);

    projects.forEach((element) => {
      element.entries.forEach((entry) => {
        if (entry.email === user.email) {
          // console.log("YES");
          setEntered(true);
        }
      });
    });
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
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontWeight: "800",
            textAlign: "right",
          }}
        >
          {/* My Balence: $1000 */}
          Competitions
        </Text>
      </View>

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
            <CardPost key={index} data={project} theEntries={project.entries} />
          ))}
        </ScrollView>
      </View>

      <Image
        style={{
          width: 35,
          height: 10,
          alignSelf: "center",
          marginTop: 15,
        }}
        source={require("../assets/Slider.png")}
      />

      <Nav />
    </SafeAreaView>
  );
};

export default Feed;
