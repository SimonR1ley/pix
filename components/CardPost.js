import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CardPost = ({ image, name, time }) => {
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
      <Text style={{ marginBottom: 10, fontSize: 25, fontWeight: "800" }}>
        {name}
      </Text>
      <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: "800" }}>
        {time}
      </Text>
      <Image
        style={{
          width: "90%",
          height: "60%",
          backgroundColor: "grey",
          borderRadius: 30,
        }}
        source={image}
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
        <View
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
        >
          <Text style={{ color: "white", fontWeight: "800" }}>$100</Text>
        </View>

        <View
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
            backgroundColor: "white",
            borderColor: "#37B4FB",
          }}
        >
          <Image
            source={require("../assets/entries.png")}
            style={{
              alignSelf: "center",
              width: "15%",
              height: "60%",
              marginRight: 5,
            }}
          />

          <Text style={{ color: "black", fontWeight: "800" }}>Tags</Text>
        </View>
      </View>
      <TouchableOpacity
        title="View"
        style={{
          width: "50%",
          height: 40,
          backgroundColor: "black",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => navigation.navigate("Press")}
      >
        <Text style={{ color: "white" }}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardPost;
