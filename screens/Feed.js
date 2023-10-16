import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import React from "react";
import CardPost from "../components/CardPost";
import { useState, useEffect, useCallback } from "react";
import Nav from "../components/Nav";
import {
  getAllProjectsFromCollection,
  getAllUsersFromCollection,
  updateUserFundsInDb,
} from "../sevices/firebaseDb";
import { getCurrentUser } from "../sevices/firebaseAuth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Feed = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [entered, setEntered] = useState(false);

  const user = getCurrentUser();

  iconimage = require("../assets/entries.png");

  useFocusEffect(
    useCallback(() => {
      //get data when viewing the screen
      // getAllProjects();

      const q = query(collection(db, "artworks"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log("Listening activated...");
        const artworkData = [];
        querySnapshot.forEach((doc) => {
          artworkData.push({ ...doc.data(), id: doc.id });
        });
        // console.log("Current projects: ", artworkData);
        setProjects(artworkData);
      });

      return () => {
        //cleanup when not viewing the screen
        console.log("Home Screen not in View...");
        unsubscribe();
      };
    }, [])
  );

  const getAllProjects = async () => {
    setRefreshing(true);
    // console.log("Getting Data...");
    const allProjects = await getAllProjectsFromCollection();
    setProjects(allProjects);
    setRefreshing(false);
  };
  const [userFunds, setUserFunds] = useState();

  const getAllUsers = async () => {
    const allUsers = await getAllUsersFromCollection();

    const filterd = allUsers.filter((item) => item.id === user.uid);
    setUserFunds(filterd[0].diamonds);
    console.log("Filtered", filterd[0].diamonds + 300);
  };

  useEffect(() => {
    getAllProjects();
    getAllUsers();
    isCollectionReady();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const isCollectionReady = async () => {
    const value = await AsyncStorage.getItem("Date");

    const twentyFourHoursLater = new Date();
    twentyFourHoursLater.setHours(twentyFourHoursLater.getHours() + 24);

    if (value < twentyFourHoursLater) {
      setModalVisible(true);
      console.log("Time left", value);
    }
  };

  const Collected = async () => {
    await AsyncStorage.setItem("Date", Date()).then(async () => {
      const value = await AsyncStorage.getItem("Date");

      let diamonds = userFunds + 300;

      console.log("Add Funds", diamonds);

      await updateUserFundsInDb(user.uid, {
        diamonds,
      });
      console.log(value);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161616" }}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // marginTop: 22,

            backgroundColor: "rgba(55,55,55,0.7)",
            // height: "100%",
            // width: "100%",
          }}
        >
          <View
            style={{
              margin: 20,
              width: "80%",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={styles.modalText}>Collect Daily Diomonds</Text>
            <View
              style={{
                width: "100%",
                height: 50,
                // backgroundColor: "red",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/diamond.png")}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 15, fontWeight: "500" }}>+300</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                Collected();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Collect</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          width: "100%",
          height: 80,
          // backgroundColor: "green",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "800",
          }}
        >
          {/* My Balence: $1000 */}
          Competitions
        </Text>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            // backgroundColor: "red",
            borderRadius: 100,
          }}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ height: "100%" }}>
        <ScrollView
          style={{}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getAllProjects}
            />
          }
        >
          {projects.map((project, index) => (
            <CardPost key={index} data={project} theEntries={project.entries} />
          ))}
          <View style={{ height: 150, width: "100%" }}></View>
        </ScrollView>
      </View>

      {/* <Image
        style={{
          width: 35,
          height: 10,
          alignSelf: "center",
          marginTop: 15,
        }}
        source={require("../assets/Slider.png")}
      /> */}

      {/* <View
        style={{
          height: 80,
          bottom: 0,
          width: "100%",
          position: "absolute",
          backgroundColor: "rgba(40,40,40,0.7)",
        }}
      >
        <Nav active={"Feed"} />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    width: 200,
    height: 40,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 200,
    height: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default Feed;
