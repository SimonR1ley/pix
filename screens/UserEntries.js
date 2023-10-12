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
import { useState, useEffect, useCallback } from "react";
import Nav from "../components/Nav";
import { getAllProjectsFromCollection } from "../sevices/firebaseDb";
import { getCurrentUser } from "../sevices/firebaseAuth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useFocusEffect } from "@react-navigation/native";

const UserEntries = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [entered, setEntered] = useState(false);

  const user = getCurrentUser();

  iconimage = require("../assets/entries.png");

  useFocusEffect(
    useCallback(() => {
      //get data when viewing the screen
      // getAllProjects();

      const q = query(collection(db, "artworks"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log("Listening activated...");
        const artworkData = [];
        querySnapshot.forEach((doc) => {
          artworkData.push({ ...doc.data(), id: doc.id });
        });
        // console.log("Current projects: ", artworkData);
        setProjects(artworkData);
      });

      return () => {
        //cleanup when not viewing the screen
        console.log("Home Screen not in View...");
        unsubscribe();
      };
    }, [])
  );

  const getAllProjects = async () => {
    setRefreshing(true);
    // console.log("Getting Data...");
    const allProjects = await getAllProjectsFromCollection();
    setProjects(allProjects);
    setRefreshing(false);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161616" }}>
      <View
        style={{
          width: "100%",
          height: 80,
          // backgroundColor: "green",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "800",
          }}
        >
          {/* My Balence: $1000 */}
          Entries
        </Text>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            // backgroundColor: "red",
            borderRadius: 100,
          }}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ height: "100%" }}>
        <FlatList
          data={projects}
          renderItem={({ item, index }) => (
            <CardPost key={index} data={item} theEntries={item.entries} />
          )}
          numColumns={3}
        />

        <View style={{ height: 150, width: "100%" }}></View>
      </View>
    </SafeAreaView>
  );
};

export default UserEntries;
