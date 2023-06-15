import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { getCurrentUser } from "../sevices/firebaseAuth";
import { addWinningsToUser, removeArtworkFromDb } from "../sevices/firebaseDb";

const Competitors = ({ route, navigation }) => {
  const user = getCurrentUser();

  const { data, expired } = route.params;
  console.log(expired);

  let userWithMaxTime = null;

  useEffect(() => {
    // if (data.ownerEmail === user.email) {

    const findMaxCompetitorTime = (data) => {
      if (
        !data ||
        !data.entries ||
        !Array.isArray(data.entries) ||
        data.entries.length === 0
      ) {
        return null; // Return null if no valid data is available
      }

      let maxCompetitorTime = -Infinity;

      data.entries.forEach((entry) => {
        if (
          typeof entry.competitorTime === "number" &&
          entry.competitorTime > maxCompetitorTime
        ) {
          maxCompetitorTime = entry.competitorTime;
          userWithMaxTime = entry.competitorId; // Update userWithMaxTime
        }
      });

      return maxCompetitorTime === -Infinity ? null : maxCompetitorTime;
    };

    const maxCompetitorTime = findMaxCompetitorTime(data);
    console.log("Max Competitor Time:", maxCompetitorTime);
    console.log("User with Max Time:", userWithMaxTime);

    if (expired === true) {
      // if (maxCompetitorTime === 17) {
      console.log("Yes True from Competitors");

      var winningArtWork = {
        imageTitle: data.imageTitle,
        image: data.image,
      };

      addWinningsToUser(userWithMaxTime, winningArtWork);
      removeArtworkFromDb(data.id);
    }
  }, []);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "10%",
          backgroundColor: "#212121",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            backgroundColor: "#212121",
            position: "absolute",
            left: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Feed")}
        >
          {/* <Text>Return</Text> */}
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/return.png")}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, color: "white" }}>
          {/* {project.imageTitle} */}
        </Text>
        <Text style={{ color: "white" }}>Owned by: {data.owner}</Text>
      </View>

      <ScrollView style={{ paddingTop: 10 }}>
        {data.entries.map((item) => (
          <View
            //   key={}
            style={{
              width: "95%",
              height: 50,
              backgroundColor: "#37B4FB",
              alignSelf: "center",
              marginBottom: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 20, color: "white" }}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "20%",
                // backgroundColor: "blue",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                {item.competitorTimeDisplay}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Competitors;

const styles = StyleSheet.create({});
