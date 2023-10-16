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

const Profile = ({ navigation }) => {
  const user = getCurrentUser();

  const [winningInfo, setWinningInfo] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, []);

  // const getAllProjects = async () => {
  //   try {
  //     const theUsers = await getAllUsersFromCollection();

  //     // console.log(theUsers);

  //     const userWinningInfo = [];

  //     theUsers.forEach((element) => {
  //       if (element.winnings && Array.isArray(element.winnings)) {
  //         element.winnings.forEach((entry) => {
  //           // console.log(
  //           //   "USER ID " + user.uid + " Winning User: " + entry.winningUser
  //           // );

  //           // console.log(entry.image);
  //           if (entry.winningUser === user.uid) {
  //             // console.log(
  //             //   "USER ID " + user.uid + " Winning User: " + entry.winningUser
  //             // );
  //             userWinningInfo.push(entry);
  //             // console.log(entry.image);
  //           }
  //         });
  //       }
  //     });

  //     setWinningInfo(userWinningInfo);
  //     // console.log(winningInfo); // Now this should log the winningInfo array
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getAllProjects = async () => {
    try {
      const theUsers = await getAllUsersFromCollection();

      const userWinningInfo = theUsers
        .filter(
          (element) => element.winnings && Array.isArray(element.winnings)
        )
        .flatMap((element) =>
          element.winnings.filter((entry) => entry.winningUser === user.uid)
        );

      setWinningInfo(userWinningInfo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#161616",
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: "black",
          marginTop: "15%",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
          }}
          source={{ uri: user.photoURL }}
        />
      </View>

      <Text
        style={{
          fontSize: 28,
          marginTop: 20,
          fontWeight: "700",
          color: "white",
        }}
      >
        {user.displayName}
      </Text>

      <TouchableOpacity
        style={{
          width: 45,
          height: 45,
          // backgroundColor: "#37B4FB",
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          position: "absolute",
          top: 60,
          right: 20,
          // padding: 20,
        }}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Image
          style={{ width: 35, height: 35 }}
          source={require("../assets/settings.png")}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 16,
          // fontWeight: "600",
          marginTop: 10,
          color: "white",
        }}
      >
        My Winnings
      </Text>

      <ScrollView
        style={{
          width: "100%",
          height: "63%",
          // backgroundColor: "green",
          marginTop: 10,
          padding: 10,
          paddingTop: 10,
        }}
      >
        {winningInfo.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-evenly",
              gap: "18%",
              flexWrap: "wrap",
            }}
          >
            {winningInfo.map((project, index) => (
              <View
                key={index}
                style={{
                  width: "30%", // Set the width to fit 3 items in a row
                  height: 120,
                  backgroundColor: "grey",
                  borderRadius: 20,
                  // marginBottom: 20,
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                  source={{ uri: project.image }}
                />
              </View>
            ))}
          </View>
        ) : (
          <>
            <Text style={{ alignSelf: "center", color: "white" }}>
              You have no Trophies yet. Keep playing!
            </Text>

            <Image source={require("../assets/where.gif")} />
          </>
        )}
        <View style={{ height: 100, width: "100%" }}></View>
      </ScrollView>

      {/* <View
        style={{
          height: 80,
          bottom: 0,
          width: "100%",
          position: "absolute",
          backgroundColor: "rgba(40,40,40,0.7)",
        }}
      >
        <Nav active={"Profile"} />
      </View> */}
    </View>
  );
};

export default Profile;
