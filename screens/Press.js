import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import CountDown from "react-native-countdown-component";
import Nav from "../components/Nav";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "../sevices/firebaseAuth";
import { enterCompetition } from "../sevices/firebaseDb";

const Press = ({ route }) => {
  const { artData } = route.params;
  const navigation = useNavigation();

  console.log(artData);

  const [buttonDisplay, setButtonDisplay] = useState(true);

  const [counter, setCounter] = useState(0);
  // const [timeHeld, setTimeHeld] = useState(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // const [dbTime, setDbTime] = useState();

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const addOne = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000); // Update counter every 1 second

    // console.log(counter);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    // const endTime = Date.now();
    // const timeDifference = Math.floor((endTime - startTimeRef.current) / 1000); // in seconds
    // setTimeHeld(formatTime(timeDifference));
    // setCounter(0);

    // setDbTime(counter);

    compete();

    setButtonDisplay(false);
  };

  // useEffect(() => {
  //   compete();
  // }, [buttonDisplay]);

  const user = getCurrentUser();

  var entry = {
    competitorId: user.uid,
    name: user.displayName,
    email: user.email,
    competitorTime: counter,
    competitorTimeDisplay: formatTime(counter).toString(),
  };

  const compete = () => {
    console.log(counter);
    enterCompetition(entry, artData).then(() => {
      navigation.navigate("Feed");
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161616" }}>
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
        <Text
          style={{
            fontSize: 25,
            marginBottom: 10,
            marginTop: 20,
            color: "white",
          }}
        >
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
          <Text style={{ fontSize: 35, fontWeight: "700", color: "white" }}>
            {/* <CountDown
            until={counter}
            // onFinish={() => alert("finished")}
            onPress={() => alert("hello")}
            size={20}
          /> */}
            {/* {hour > 9 ? null : 0}
            {hour.toString()}:{min > 9 ? null : 0}
            {min.toString()}:{sec > 9 ? null : 0} */}
            {formatTime(counter).toString()}
          </Text>
        </View>

        <Text style={{ fontSize: 25, marginBottom: 20, color: "white" }}>
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
            // backgroundColor: "#37B4FB",
            marginTop: 30,
            borderRadius: 1000,
            borderWidth: 5,
            borderColor: "#BBFB05",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // shadowOffset: { width: 0, height: 0 },
            // shadowColor: "#171717",
            // shadowOpacity: 0.7,
            // shadowRadius: 2,
          }}
          onPressIn={addOne}
          onPressOut={stopTimer}
          // onLongPress={() => setTime()}
        >
          <View
            style={{
              width: "90%",
              height: "90%",
              backgroundColor: "#BBFB05",
              borderRadius: 1000,
            }}
          ></View>
        </TouchableOpacity>
      </View>

      {/* <Nav /> */}
    </SafeAreaView>
  );
};

export default Press;
