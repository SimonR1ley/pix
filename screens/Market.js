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
  Modal,
  TextInput,
} from "react-native";
import React from "react";
import CardPost from "../components/CardPost";
import { useState, useEffect, useCallback } from "react";
import Nav from "../components/Nav";
import {
  getAllProjectsFromCollection,
  getAllProjectsFromMarket,
  getAllUsersFromCollection,
  makeOffer,
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
import MarketCard from "../components/MarketCard";

const Market = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [imageView, setImageView] = useState("");
  const [artworkId, setArtworkId] = useState();
  const [imageName, setImageName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerImage, setOwnerImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [ownerId, setOwnerId] = useState();

  const [offerAmount, setOfferAmount] = useState(0);
  const [madeOffer, setMadeOffer] = useState("Offer");

  const [entered, setEntered] = useState(false);

  const user = getCurrentUser();

  iconimage = require("../assets/entries.png");

  useFocusEffect(
    useCallback(() => {
      //get data when viewing the screen
      // getAllProjects();

      const q = query(collection(db, "market"));
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
    const allProjects = await getAllProjectsFromMarket();
    setProjects(allProjects);
    setRefreshing(false);
  };

  const [userFunds, setUserFunds] = useState();

  const getAllUsers = async () => {
    const allUsers = await getAllUsersFromCollection();

    const filterd = allUsers.filter((item) => item.id === user.uid);
    setUserFunds(filterd[0].diamonds);
    console.log("Market Filtered", filterd[0].diamonds);
  };

  useEffect(() => {
    getAllProjects();
    getAllUsers();
  }, []);

  const ImageViewName = (
    name,
    image,
    owner,
    ownerImage,
    artworkId,
    ownerId
  ) => {
    setModalVisible(true);
    setImageView(image);
    setArtworkId(artworkId);
    setImageName(name);
    setOwnerName(owner);
    setOwnerImage(ownerImage);
    setOwnerId(ownerId);
    console.log("Got id", ownerId);
  };

  const MakeOffer = () => {
    var offer = {
      userId: user.uid,
      username: user.displayName,
      offerAmount: offerAmount,
      image: imageView,
      imageName: imageName,
      artworkId: artworkId,
      usersOfferFunds: userFunds,
      status: "unacceppted",
    };

    if (offerAmount) {
      makeOffer(artworkId, offer);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161616" }}>
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
          Market
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

      <Modal
        style={{ justifyContent: "flex-end", position: "relative" }}
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1, // Use flex: 1 to make it expand and occupy the remaining space
            backgroundColor: "#161616",
            position: "absolute",
            zIndex: 2,
            bottom: 0, // Position at the bottom
            width: "100%",
            height: "100%", // You can adjust the height as needed
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
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
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "70%",
                // backgroundColor: "green",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  // backgroundColor: "red",
                  borderRadius: 100,
                  marginRight: 10,
                }}
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              >
                <Image
                  source={{ uri: user.photoURL }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                    backgroundColor: "#979797",
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  // width: "50%",
                  height: "100%",
                  // backgroundColor: "red",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  {/* My Balence: $1000 */}
                  {user.displayName}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // height: 30,
                    // backgroundColor: "green",
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/diamond.png")}
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {/* My Balence: $1000 */}
                    {userFunds}
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                color: "white",
                // backgroundColor: "red",
                fontSize: 16,
                fontWeight: "600",
                // height: "100%",
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              Cancel
            </Text>
          </View>

          <View
            style={{
              width: "95%",
              height: 350,
              backgroundColor: "#1B1B1D",
              borderRadius: 30,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              position: "relative",
              marginTop: 20,
            }}
          >
            <Image
              source={imageView ? { uri: imageView } : null}
              style={{
                width: "100%",
                height: "100%",
                alignSelf: "center",
                borderRadius: 30,
                // backgroundColor: 'grey',
              }}
            />
          </View>
          <View
            style={{
              width: "95%",
              height: "40%",
              // backgroundColor: "green",
              padding: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                // backgroundColor: "red",
              }}
            >
              <Text style={{ color: "white", fontSize: 26, fontWeight: "600" }}>
                {imageName}
              </Text>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  // backgroundColor: "green",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                {/* <Image
                  source={{ uri: ownerImage }}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#979797",
                    marginRight: 10,
                    borderRadius: 100,
                  }}
                /> */}
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                >
                  {ownerName}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                height: "60%",
                // backgroundColor: "green",
                alignItems: "center",
                display: "flex",
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              {ownerId != user.uid ? (
                <>
                  <Text
                    style={{ color: "white", fontSize: 24, fontWeight: "800" }}
                  >
                    Buy
                  </Text>

                  <View
                    style={{
                      width: 220,
                      height: 45,
                      backgroundColor: "#2A2D2E",
                      borderRadius: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                      marginTop: 20,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <Image
                      source={require("../assets/diamond.png")}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                    <TextInput
                      style={{
                        flex: 1, // This allows the TextInput to take up the available space
                        color: "#979797", // Text color
                        // backgroundColor: "red",
                        fontWeight: "600",
                      }}
                      placeholder="Your offer"
                      placeholderTextColor="#979797"
                      onChangeText={(text) => {
                        setOfferAmount(text);
                      }}
                    />
                  </View>

                  <TouchableOpacity
                    style={{
                      width: 160,
                      height: 45,
                      backgroundColor: "#BBFB05",
                      borderRadius: 15,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      // setMadeOffer("Offer Sent");
                      // if (madeOffer === "Offer") {
                        MakeOffer(); 
                        setModalVisible(false)
                      // }
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: 17,
                      }}
                    >
                      {madeOffer}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ height: "100%" }}>
        <FlatList
          data={projects}
          contentContainerStyle={{
            // flexDirection: "row",
            // flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "30%",
                aspectRatio: 1,
                margin: "1.5%",
              }}
            >
              <MarketCard
                key={index}
                data={item}
                theEntries={item.entries}
                imageName={ImageViewName}
              />
            </View>
          )}
          numColumns={3}
        />

        <View style={{ height: 150, width: "100%" }}></View>
      </View>
    </SafeAreaView>
  );
};

export default Market;
