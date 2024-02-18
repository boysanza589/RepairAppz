import { View, Image, TextInput, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "../Screen/data"
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function menuhome({ navigation }) {
  const $linq = (arr) => new linq(arr);
  const [modal, setmodal1] = useState(false)
  const [isUser, setUser] = useState(false)
  const [isAdmin, setAdmin] = useState("users")

  useFocusEffect(
    React.useCallback(() => {
      console.log("profile...");
      IsMyProfile();
    }, [])
  );

  const selectPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      // alert('Permission to access media library is required!');
      MessageBox.Alert("Whocheck ไม่มีสิทธิ์เข้าถึงรูปภาพ", "โปรดอนญาตให้เข้าถึงรูปภาพของคุณ")
      return;
    }

    try {

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: false, // only allow selection of a single image
      });

      // setLoading(true)
      console.log("result: ", result.assets[0].uri);
      // Upload image to Firebase Cloud Storage and update user document in Firestore with download URL
      // ...
      if (result.canceled) {
        // setLoading(false);
        return;
      }
      else if (!result.canceled) {
        // do something with the selected picture
        // Upload image to Firebase Cloud Storage
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const storageRef = firebase.storage().ref().child(`users/${userId}/profilePicture`);
        const snapshot = await storageRef.put(blob);

        // Get download URL for the image
        const downloadURL = await snapshot.ref.getDownloadURL();

        // Update user document in Firestore with download URL
        const userRef = firebase.firestore().collection('users').doc(userId);
        await userRef.update({ ProfilePicture: downloadURL });

        console.log('Profile picture uploaded successfully!');

        let docRef = firebase.firestore().collection("รายชื่อพนักงาน").doc('All');
        docRef.get().then(async function (doc) {
          if (doc.exists) {
            let ListName = doc.data().ListName;
            let IsIndex;
            // let find_MyEmail = $linq(ListName).where((x) => x.email == isUser.email).toArray()
            // console.log('อินเด็กเท่าไหร่: ', ListName.indexOf(find_MyEmail))
            for (let i = 0; i < ListName.length; i++) {
              if (ListName[i].email === isUser.email) {
                IsIndex = i; // Update IsIndex with the index of the matching object
                break; // Exit the loop once a match is found
              }
            }

            // Now, IsIndex contains the index of the matching object, or -1 if no match was found
            console.log('IsIndexdddddddd:', IsIndex)
            ListName[IsIndex].ProfilePicture = downloadURL;
            docRef.update({
              ListName: ListName
            }).then(function () {
              console.log("Array updated successfully");
            }).catch(function (error) {
              console.log("Error updating array: ", error);
            });

          } else {
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document: ", error);
        });
        // setLoading(false)
      }
      // setModalVisible(false);

    } catch (err) {
      console.log("error: ", err);
      console.log("คุณไม่ได้เลือกรูปอ่ะดิ้..");
      // setLoading(false)
    }


  };


  const IsMyProfile = () => {
    let me = firebase.auth().currentUser.uid;
    console.log("me : ", me);
    const docRef = firebase.firestore().collection('users').doc(me)
    console.log("docRef: ", docRef);
    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        console.log("ฉันเอง: ", doc.data());
        if (doc.data().role) {
          setAdmin(doc.data().role)
        }
        setUser(doc.data())
      }
    })
  }

  const logout = () => {
    setmodal1(false)
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const gomodal1 = () => {
    setmodal1(true)
  }

  // const gosignin = () => {
  //   setmodal1(false)
  //   navigation.navigate("Signin")
  // }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={["#DEC4FC", "#91C6FC"]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "13%",
            backgroundColor: "#583C81",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "50%",
              marginTop: "10%",
              marginLeft: "5%",
            }}
          >
            {isAdmin == "users"
              ? <Text
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              >
                {isUser.displayName}
              </Text>
              : <Text
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              >
                Admin
              </Text>
            }
            <Text
              style={{
                color: "white",
                fontSize: 15,
              }}
            >
              {isUser.studentnumber}
            </Text>
            <View
              style={{
                marginLeft: "85%",
                bottom: "10%",
                position: "absolute",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("profile")}
                style={{

                }}>
                <Image source={require("../assets/image/Avatar.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text
          style={{
            color: "#677185",
            fontSize: 25,
            marginLeft: "10%",
            marginTop: "3%",
          }}
        >
          เมนู
        </Text>
        {(isAdmin == "users")
          ?
          <TouchableOpacity
            onPress={() => navigation.navigate("repair")}
            style={{
              width: "40%",
              height: "20%",
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              marginTop: 20,
              marginLeft: 35,
            }}
          >
            <View
              style={{
                marginTop: "15%",
                marginLeft: "35%",
              }}
            >
              <FontAwesome name="wrench" size={60} color="#677185" />
            </View>
            <Text
              style={{
                fontSize: 15,
                marginTop: "20%",
                marginLeft: "35%",
              }}
            >
              แจ้งซ่อม
            </Text>
          </TouchableOpacity>
          : <TouchableOpacity
            onPress={() => navigation.navigate("Report")}
            style={{
              width: "40%",
              height: "20%",
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              marginTop: 20,
              marginLeft: 35,
            }}
          >
            <View
              style={{
                marginTop: "15%",
                marginLeft: "35%",
              }}
            >
              <FontAwesome name="wrench" size={60} color="#677185" />
            </View>
            <Text
              style={{
                fontSize: 15,
                marginTop: "20%",
                // marginLeft: "35%",
                textAlign: "center"
              }}
            >
              รายงานแจ้งซ่อม
            </Text>
          </TouchableOpacity>
        }

        <TouchableOpacity
          onPress={() => navigation.navigate("trackstatus")}
          style={{
            width: "40%",
            height: "20%",
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            bottom: "20%",
            marginLeft: "52%",
          }}
        >
          <View
            style={{
              marginTop: "20%",
              marginLeft: "35%",
            }}
          >
            <Entypo name="text-document-inverted" size={50} color="#677185" />
          </View>
          <Text
            style={{
              fontSize: 15,
              marginTop: "20%",
              marginLeft: "30%",
            }}
          >
            ติดตามสถานะ
          </Text>
        </TouchableOpacity>

      </LinearGradient >
    </View >
  );
}
