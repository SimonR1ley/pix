import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Timestamp,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  addWinningsToUser,
  enterCompetition,
  removeArtworkFromDb,
} from "../sevices/firebaseDb";
import { getCurrentUser } from "../sevices/firebaseAuth";
import { useState } from "react";

const CardPost = ({ data, theEntries }) => {
  const user = getCurrentUser();

  const [artData, setArtData] = useState(data.id);

  const [expired, setExpired] = useState(false);

  const [entered, setEntered] = useState(false);

  useEffect(() => {
    theEntries.forEach((element) => {
      if (element.email === user.email) {
        setEntered(true);
      } else {
        setEntered(false);
      }
    });

    getTime();
  }, [entered]);

  const isTimestampOver24HoursLater = (timestamp) => {
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const currentTimestamp = Date.now();
    const targetTimestamp = Date.parse(timestamp);

    const futureTimestamp = targetTimestamp + twentyFourHoursInMilliseconds;

    console.log(currentTimestamp >= futureTimestamp);

    if (currentTimestamp >= futureTimestamp) {
      setExpired(true);
    } else {
      setExpired(false);
    }
    return currentTimestamp >= futureTimestamp;
  };

  const getTime = async () => {
    isTimestampOver24HoursLater(data.uploadedAt);
  };

  const navigation = useNavigation();
  iconimage = require("../assets/entries.png");

  return (
    <View
      style={{
        width: 410,
        height: 600,
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#171717",
        shadowOpacity: 0.7,
        shadowRadius: 5,
        margin: 10,
      }}
    >
      <Text
        style={{
          marginBottom: 10,
          fontSize: 25,
          fontWeight: "800",
          color: "black",
        }}
      >
        {data.imageTitle}
      </Text>
      <Text
        style={{
          marginBottom: 10,
          fontSize: 15,
          color: "black",
        }}
      >
        Owned By: {data.owner}
      </Text>
      <Text style={{ marginBottom: 5, fontSize: 18, fontWeight: "800" }}></Text>
      <Image
        style={{
          width: "90%",
          height: "70%",
          backgroundColor: "grey",
          borderRadius: 30,
        }}
        source={{ uri: data.image }}
      />
      <View
        style={{
          width: "80%",
          height: "6%",
          //   backgroundColor: "red",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        {entered === false ? (
          <TouchableOpacity
            style={{
              width: "40%",
              height: "100%",
              borderRadius: 8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderStyle: "solid",
              borderWidth: "2px",
              backgroundColor: "#37B4FB",
              borderColor: "#37B4FB",
            }}
            onPress={() => navigation.push("Press", { artData })}
          >
            <Text style={{ color: "white", fontWeight: "800" }}>Enter</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              width: "40%",
              height: "100%",
              borderRadius: 8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderStyle: "solid",
              backgroundColor: "#37B4FB",
            }}
            onPress={() => navigation.push("Competitors", { data, expired })}
          >
            <Image
              source={require("../assets/entries.png")}
              style={{
                alignSelf: "center",
                width: "12%",
                height: "60%",
                marginRight: 5,
              }}
            />

            <Text style={{ color: "white", fontWeight: "400" }}>
              Competitors
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CardPost;
