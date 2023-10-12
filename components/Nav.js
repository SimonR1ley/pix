import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "../sevices/firebaseAuth";

const Nav = () => {
  const navigation = useNavigation();

  console.log(active);

  const user = getCurrentUser();

  // console.log(user.displayName);

  const [active, setActive] = useState("Feed");

  const [homeIcon, setHomeIcon] = useState(require("../assets/home.png"));
  const [marketIcon, setMarketIcon] = useState(require("../assets/market.png"));
  const [entriesIcon, setEntriesIcon] = useState(
    require("../assets/myentries.png")
  );
  const [profileIcon, setProfileIcon] = useState(
    require("../assets/profile.png")
  );

  const [postIcon, setPostIcon] = useState(require("../assets/Post.png"));

  useEffect(() => {
    if (active === "Profile") {
      setProfileIcon(require("../assets/profileactive.png"));
    } else {
      setProfileIcon(require("../assets/profile.png"));
    }

    if (active === "Feed") {
      setHomeIcon(require("../assets/homeactive.png"));
    } else {
      setHomeIcon(require("../assets/home.png"));
    }

    if (active === "Market") {
      setMarketIcon(require("../assets/marketactive.png"));
    } else {
      setMarketIcon(require("../assets/market.png"));
    }

    if (active === "Profile") {
      setProfileIcon(require("../assets/profileactive.png"));
    } else {
      setProfileIcon(require("../assets/profile.png"));
    }

    if (active === "Entries") {
      setEntriesIcon(require("../assets/myentriesactive.png"));
    } else {
      setEntriesIcon(require("../assets/myentries.png"));
    }

    if (active === "Post") {
      setPostIcon(require("../assets/Postactive.png"));
    } else {
      setPostIcon(require("../assets/Post.png"));
    }
  }, [active]);

  return (
    <View
      style={{
        height: 80,
        bottom: 0,
        width: "100%",
        position: "absolute",
        backgroundColor: "rgba(40,40,40,0.9 )",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 50,
          // backgroundColor: "rgba(40,40,40,0.7)",
          alignSelf: "center",
          // top: 830,
          // bottom: 10,
          // borderRadius: 30,
          marginTop: 10,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ width: 30, height: "60%" }}
          onPress={() => {
            setActive("Feed");
            navigation.navigate("Feed");
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "green",
            }}
            source={homeIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: 30, height: "58%" }}
          onPress={() => {
            setActive("Market");
            navigation.navigate("Market");
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "green",
            }}
            source={marketIcon}
          />
        </TouchableOpacity>
        {user.displayName === "SimonRiley" ? (
          <TouchableOpacity
            style={{ width: 38, height: "75%" }}
            onPress={() => {
              setActive("Post");
              navigation.navigate("Post");
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                // backgroundColor: "green",
              }}
              source={postIcon}
            />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={{ width: 35, height: "50%" }}
          onPress={() => {
            setActive("Entries");
            navigation.navigate("UserEntries");
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "green",
            }}
            source={entriesIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: 30, height: "60%" }}
          onPress={() => {
            setActive("Profile");
            navigation.navigate("Profile");
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: "green",
            }}
            source={profileIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Nav;
