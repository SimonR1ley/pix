import { View, Text, Button, Pressable, TouchableOpacity } from "react-native";
import React from "react";

export const ButtonBlue = ({ buttonText }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 180,
        height: 50,
        backgroundColor: "#37B4FB",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 30,
      }}
    >
      <Text style={{ color: "white", fontWeight: "700", fontSize: 17 }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};
