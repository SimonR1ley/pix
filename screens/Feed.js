import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import CardPost from "../components/CardPost";
import { useState } from "react";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";

const Feed = () => {
  const navigation = useNavigation();

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
          $1000
        </Text>
      </View>

      <FlatList
        style={{ width: "100%" }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={profileInfo}
        renderItem={({ item }) => (
          <CardPost name={item.name} image={item.image} time={item.time} />
        )}
        keyExtractor={(item) => item.key.toString()}
      />

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
