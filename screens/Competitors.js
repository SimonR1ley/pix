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
import {
  addImageToMarket,
  addWinningsToUser,
  removeArtworkFromDb,
} from "../sevices/firebaseDb";

const Competitors = ({ route, navigation }) => {
  const user = getCurrentUser();

  const { data, expired } = route.params;
  console.log(expired);

  console.log("From Comp", data);

  let userWithMaxTime = null;
  let userWithMaxTimeName = null;

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
          userWithMaxTimeName = entry.name;
        }
      });

      return maxCompetitorTime === -Infinity ? null : maxCompetitorTime;
    };

    const maxCompetitorTime = findMaxCompetitorTime(data);
    console.log("Max Competitor Time:", maxCompetitorTime);
    console.log("User with Max Time:", userWithMaxTime);

    if (expired === true) {
      console.log("Yes True from Competitors");

      var winningArtWork = {
        winningUser: userWithMaxTime,
        imageTitle: data.imageTitle,
        image: data.image,
      };

      var marketImage = {
        winningUserName: userWithMaxTimeName,
        winningUserId: userWithMaxTime,
        winningUserImage: data.ownerImage,
        imageTitle: data.imageTitle,
        image: data.image,
        offers: [],
      };

      // addWinningsToUser(userWithMaxTime, winningArtWork);
      addImageToMarket(marketImage);
      removeArtworkFromDb(data.id);
    }
  }, []);

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#161616" }}>
      <View
        style={{
          width: "95%",
          // height: "10%",
          padding: 15,
          // backgroundColor: "#212121",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderBottomWidth: .5,
          borderBottomColor: "white",
          marginBottom: 10,
          alignSelf: "center"
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            // backgroundColor: "#212121",
            position: "absolute",
            left: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Feed")}
        >
          {/* <Text>Return</Text> */}
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../assets/return.png")}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, color: "white" }}>
          {data.imageTitle}
        </Text>
      </View>

      <ScrollView style={{ paddingTop: 10 }}>
        {data.entries.map((item, index) => (
          <View
            key={index}
            style={{
              width: "95%",
              height: 50,
              backgroundColor: "#BBFB05",
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
            <Text style={{ fontSize: 18, marginRight: 20, color: "black" }}>
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
              <Text style={{ fontSize: 14, fontWeight: "600", color: "black" }}>
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
