import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "../components/Nav";
import { useState } from "react";
import { getCurrentUser } from "../sevices/firebaseAuth";
import {
  getAllProjectsFromMarket,
  getAllUsersFromCollection,
  removeOffers,
  updateImageOwner,
} from "../sevices/firebaseDb";

const Profile = ({ navigation }) => {
  const user = getCurrentUser();
  console.log(user.uid);
  const [modalVisible, setModalVisible] = useState(false);
  const [winningInfo, setWinningInfo] = useState([]);
  const [imageInfo, setImageInfo] = useState();
  const [userFunds, setUserFunds] = useState();

  const [selectedOffer, setSelectedOffer] = useState();

  const [offerInfo, setOfferInfo] = useState([]);

  const [loading, setLoading] = useState(true);

  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setUpdate(false)
    getAllProjects();
    getAllUsers();
    console.log(userFunds);
  }, [update, modalVisible]);

  const getAllUsers = async () => {
    const allUsers = await getAllUsersFromCollection();

    const filterd = allUsers.filter((item) => item.id === user.uid);
    setUserFunds(filterd[0].diamonds);
    // console.log("Market Filtered", filterd[0].diamonds);
  };

  const getImageInfo = (imageInfo) => {
    console.log(imageInfo.offers);
    setOfferInfo(imageInfo.offers);
  };

  const changeOwnership = (project) => {
    const myInfo = {
      id: user.uid,
      funds: userFunds,
    };
    updateImageOwner(myInfo, project);
  };

  const getAllProjects = async () => {
    try {
      const marketItems = await getAllProjectsFromMarket();
      // console.log("MarketItems", marketItems);
      const userWinningInfo = marketItems.filter(
        (element) => element.winningUserId === user.uid
      );

      // console.log("Winning", userWinningInfo);

      setWinningInfo(userWinningInfo);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading === true) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "500" }}>Loading</Text>
        <ActivityIndicator animating={loading} size={40} />
      </View>
    );
  } else {
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
              backgroundColor: "rgba(55,55,55,0.7)",
            }}
          >
            <View
              style={{
                margin: 20,
                width: "90%",
                height: "85%",
                backgroundColor: "white",
                borderRadius: 40,
                padding: 10,
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
              <Text style={styles.modalText}>Offers</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  width: "100%",
                  height: "100%",
                }}
               
                refreshControl
                refreshing={loading}
                onRefresh={() => setUpdate(true)}
              >
                {offerInfo.map((project, index) => (
                  <>
                    {/* <Text key={index}>{project.username}</Text> */}
                    <View
                      key={index}
                      style={{
                        width: "98%",
                        height: 60,
                        backgroundColor: "white",
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        shadowColor: "#000",
                        borderRadius: 10,
                        alignSelf: "center",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        {project.username}
                      </Text>
                      <View
                        style={{
                          width: "40%",
                          height: "100%",
                          // backgroundColor: "green",
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
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          {project.offerAmount}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "30%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: "rgba(30, 30, 30, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 15,
                          }}
                          onPress={() => {
                            setSelectedOffer(project);
                            changeOwnership(project);
                            setModalVisible(false);
                            setUpdate(true);
                            // console.log("SelectedOffer", project);
                          }}
                        >
                          <Image
                            source={require("../assets/like.png")}
                            style={{ width: 25, height: 25 }}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: "rgba(30, 30, 30, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 15,
                          }}
                          onPress={() => {
                            // Collected();
                            setModalVisible(false);
                            removeOffers(project);
                            // navigation.replace(Profile)
                            setUpdate(true);
                          }}
                        >
                          <Image
                            source={require("../assets/dislike.png")}
                            style={{ width: 25, height: 25 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ))}
              </ScrollView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  // Collected();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // height: 30,
            // backgroundColor: "green",
            marginTop: 10,
            marginBottom: 10,
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
          refreshControl
          refreshing={loading}
          onRefresh={() => setUpdate(true)}
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
                <>
                  {project.offers?.length ? (
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: "30%", // Set the width to fit 3 items in a row
                        height: 120,
                        backgroundColor: "#BBFB05",
                        borderRadius: 20,
                        // marginBottom: 20,
                        padding: 4,
                      }}
                      onPress={() => {
                        getImageInfo(project);
                        setModalVisible(true);
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
                    </TouchableOpacity>
                  ) : (
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
                  )}
                </>
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
  }
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    width: 200,
    height: 40,
  },
  buttonClose: {
    backgroundColor: "#BBFB05",
    width: 200,
    height: 40,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 23,
  },
});

export default Profile;
