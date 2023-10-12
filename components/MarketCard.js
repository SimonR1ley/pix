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
  getAllUsersFromCollection,
  removeArtworkFromDb,
} from "../sevices/firebaseDb";
import { getCurrentUser } from "../sevices/firebaseAuth";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const MarketCard = ({ data, theEntries, imageName }) => {
  const user = getCurrentUser();

  console.log(data.winningUserName);

  //   const [artData, setArtData] = useState(data.id);

  const [expired, setExpired] = useState(false);

  const [entered, setEntered] = useState(false);

  const [timeLeft, setTimeLeft] = useState();

  const [imgDesc, setImgDesc] = useState();

  const [allUsers, setAllUsers] = useState();

  //   const getAllUsers = async () => {
  //     const allUsers = await getAllUsersFromCollection();
  //     setAllUsers(allUsers);
  //     console.log(allUsers);
  //   };

  //   useEffect(() => {
  //     // getAllUsers();
  //     const hasEntered = () => {
  //       const userEntered = data.entries.some((entry) => {
  //         entry.competitorId === user.uid;
  //         console.log(entry.competitorId + " " + user.uid);
  //         return entry.competitorId === user.uid;
  //       });
  //       setEntered(userEntered);

  //       console.log(entered);
  //     };

  //     const isTimestampOver24HoursLater = (timestamp) => {
  //       const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  //       const currentTimestamp = Date.now();
  //       const targetTimestamp = Date.parse(timestamp);

  //       const futureTimestamp = targetTimestamp + twentyFourHoursInMilliseconds;

  //       // console.log(currentTimestamp >= futureTimestamp);

  //       if (currentTimestamp >= futureTimestamp) {
  //         setExpired(true);
  //       } else {
  //         setExpired(false);
  //       }
  //       return currentTimestamp >= futureTimestamp;
  //     };

  //     const calculateTimeLeft = (targetTime) => {
  //       const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  //       const currentTimestamp = Date.now();
  //       const targetTimestamp = Date.parse(targetTime);

  //       const futureTimestamp = targetTimestamp + twentyFourHoursInMilliseconds;

  //       const timeDifference = futureTimestamp - currentTimestamp;
  //       const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
  //       const minutesLeft = Math.floor((timeDifference / (1000 * 60)) % 60);
  //       const secondsLeft = Math.floor((timeDifference / 1000) % 60);

  //       const timeLeftString = `${hoursLeft} : ${minutesLeft} : ${secondsLeft}`;
  //       console.log(timeLeftString);
  //       setTimeLeft(timeLeftString);
  //       return timeLeftString;
  //     };

  //     hasEntered();
  //     calculateTimeLeft(data.uploadedAt);
  //     isTimestampOver24HoursLater(data.uploadedAt);
  //   }, [data.entries, theEntries]);

  const navigation = useNavigation();
  iconimage = require("../assets/entries.png");

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#171717",
        shadowOpacity: 0.7,
        shadowRadius: 5,
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
            fontSize: "10%",
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

      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "grey",
          borderRadius: 30,
          position: "absolute",
          zIndex: -1,
        }}
        onPress={() =>
          imageName(
            data.imageTitle,
            data.image,
            data.winningUserName,
            data.winningUserImage
          )
        }
        activeOpacity={0.9}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "grey",
            borderRadius: 20,
          }}
          source={{ uri: data.image }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MarketCard;
