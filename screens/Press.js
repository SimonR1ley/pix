import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import CountDown from "react-native-countdown-component";
import Nav from "../components/Nav";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

const Press = () => {
  const navigation = useNavigation();

  const timer = useRef(null);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);

  const [buttonDisplay, setButtonDisplay] = useState(true);

  const addOne = () => {
    setSec((prevValue) => prevValue + 1);
    timer.current = setTimeout(addOne, 200);
  };

  if (sec > 60) {
    setMin((prevValue) => prevValue + 1);
    setSec(0);
  }

  if (min > 60) {
    setHour((prevValue) => prevValue + 1);
    setMin(0);
  }

  const stopTimer = () => {
    clearTimeout(timer.current);
    // setButtonDisplay(false);
    setTimeout(() => {
      setSec(0);
      setMin(0);
      setHour(0);
      navigation.navigate("Feed");
    }, 2000);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          height: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: 25, marginBottom: 10, marginTop: 20 }}>
          Count
        </Text>
        <View
          style={{
            width: "90%",
            height: 40,
            // backgroundColor: "green",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: "700" }}>
            {/* <CountDown
            until={counter}
            // onFinish={() => alert("finished")}
            onPress={() => alert("hello")}
            size={20}
          /> */}
            {hour > 9 ? null : 0}
            {hour.toString()}:{min > 9 ? null : 0}
            {min.toString()}:{sec > 9 ? null : 0}
            {sec.toString()}
          </Text>
        </View>

        <Text style={{ fontSize: 25, marginBottom: 20 }}>
          Click and hold to Start
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          height: "70%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          disabled={!buttonDisplay ? true : false}
          style={{
            width: "70%",
            height: "50%",
            backgroundColor: "#37B4FB",
            marginTop: 30,
            borderRadius: 20,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "#171717",
            shadowOpacity: 0.7,
            shadowRadius: 2,
          }}
          onPressIn={addOne}
          onPressOut={stopTimer}
          // onLongPress={() => setTime()}
        ></TouchableOpacity>
      </View>

      {/* <Nav /> */}
    </SafeAreaView>
  );
};

export default Press;
