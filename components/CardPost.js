import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Timestamp,
} from "react-native";
import React, { useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  addWinningsToUser,
  enterCompetition,
  removeArtworkFromDb,
} from "../sevices/firebaseDb";
import { getCurrentUser } from "../sevices/firebaseAuth";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const CardPost = ({ data, theEntries }) => {
  const user = getCurrentUser();

  // console.log(data);

  const [artData, setArtData] = useState(data.id);

  const [expired, setExpired] = useState(false);

  const [entered, setEntered] = useState(false);

  const [timeLeft, setTimeLeft] = useState();

  const [imgDesc, setImgDesc] = useState();

  useEffect(() => {
    const hasEntered = () => {
      const userEntered = data.entries.some((entry) => {
        entry.competitorId === user.uid;
        console.log(entry.competitorId + " " + user.uid);
        return entry.competitorId === user.uid;
      });
      setEntered(userEntered);

      console.log(entered);
    };

    const isTimestampOver24HoursLater = (timestamp) => {
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const currentTimestamp = Date.now();
      const targetTimestamp = Date.parse(timestamp);

      const futureTimestamp = targetTimestamp + twentyFourHoursInMilliseconds;

      // console.log(currentTimestamp >= futureTimestamp);

      if (currentTimestamp >= futureTimestamp) {
        setExpired(true);
      } else {
        setExpired(false);
      }
      return currentTimestamp >= futureTimestamp;
    };

    const calculateTimeLeft = (targetTime) => {
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const currentTimestamp = Date.now();
      const targetTimestamp = Date.parse(targetTime);

      const futureTimestamp = targetTimestamp + twentyFourHoursInMilliseconds;

      const timeDifference = futureTimestamp - currentTimestamp;
      const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeDifference / (1000 * 60)) % 60);
      const secondsLeft = Math.floor((timeDifference / 1000) % 60);

      const timeLeftString = `${hoursLeft} : ${minutesLeft} : ${secondsLeft}`;
      console.log(timeLeftString);
      setTimeLeft(timeLeftString);
      return timeLeftString;
    };

    hasEntered();
    calculateTimeLeft(data.uploadedAt);
    isTimestampOver24HoursLater(data.uploadedAt);
  }, [data.entries, theEntries]);

  const navigation = useNavigation();
  iconimage = require("../assets/entries.png");

  return (
    <View
      style={{
        width: "95%",
        height: 400,
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 30,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#171717",
        shadowOpacity: 0.7,
        shadowRadius: 5,
        margin: 10,
      }}
    >
      <View
        style={{
          width: "80%",
          height: "15%",
          backgroundColor: "rgba(40,40,40,0.7)",
          position: "absolute",
          bottom: 15,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: "white",
          }}
        >
          {data.imageTitle}
        </Text>

        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "white",
              marginRight: 10,
              borderRadius: 100,
            }}
          ></View>
          <Text
            style={{
              fontSize: 15,
              color: "white",
            }}
          >
            {data.owner}
          </Text>
        </View> */}
      </View>

      {/* <Text style={{ marginBottom: 5, fontSize: 18 }}>Time Left</Text> */}
      {!imgDesc ? (
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "grey",
            borderRadius: 30,
            position: "absolute",
            zIndex: -1,
          }}
          onPress={() => setImgDesc(true)}
          activeOpacity={0.9}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "grey",
              borderRadius: 30,
            }}
            source={{ uri: data.image }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: "90%",
            height: "70%",
            backgroundColor: "grey",
            borderRadius: 30,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: -1,
          }}
          onPress={() => setImgDesc(false)}
          activeOpacity={0.9}
        >
          <Text>{data.description}</Text>
        </TouchableOpacity>
      )}

      <View
        style={{
          width: 150,
          height: 40,
          borderRadius: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
          // borderStyle: "solid",
          // borderWidth: "2px",
          // backgroundColor: "#37B4FB",
          backgroundColor: "rgba(40,40,40,0.7)",
          position: "absolute",
          top: 20,
          right: 15,
          // borderColor: "#37B4FB",
        }}
      >
        <Image
          source={require("../assets/time.png")}
          style={{
            alignSelf: "center",
            width: 20,
            height: 20,
          }}
        />
        <Text style={{ color: "white", fontWeight: "900", fontSize: 10 }}>
          {timeLeft}
        </Text>
      </View>

      {!entered ? (
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // borderStyle: "solid",
            // borderWidth: "2px",
            // backgroundColor: "#37B4FB",
            backgroundColor: "rgba(40,40,40,0.7)",
            position: "absolute",
            top: 20,
            left: 15,
            // borderColor: "#37B4FB",
          }}
          onPress={() => navigation.push("Press", { artData })}
        >
          <Image
            source={require("../assets/add.png")}
            style={{
              alignSelf: "center",
              width: "50%",
              height: "50%",
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // borderStyle: "solid",
            // borderWidth: "2px",
            // backgroundColor: "#37B4FB",
            backgroundColor: "rgba(40,40,40,0.7)",
            position: "absolute",
            top: 20,
            left: 15,
          }}
          onPress={() => navigation.push("Competitors", { data, expired })}
        >
          <Image
            source={require("../assets/entries.png")}
            style={{
              alignSelf: "center",
              width: "60%",
              height: "60%",
            }}
          />

          {/* <Text style={{ color: "white", fontWeight: "400" }}>Competitors</Text> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CardPost;
