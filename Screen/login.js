import { View, Image, TextInput, Text, TouchableOpacity, ScrollView } from "react-native";
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../Screen/data"
import MessageBox from "../component/msg";

export default function login({ navigation }) {
  // const [text, onChangeText] = React.useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(true);

  const togglepassword = () => {
    setshowpassword(!showpassword)
  };

  // const checkuser = () => {
  //   console.log('อีเมล ', email);
  //   console.log('พาสเวิด ', password);


  //   const auth = getAuth();
  //   console.log("auth: ", auth);
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       console.log("userCredential: ", userCredential);
  //       // Signed in
  //       const user = userCredential.user;
  //       navigation.navigate("menuhome")
  //       // ...
  //     })
  //     .catch((error) => {
  //       console.log("error: ", error);
  //       if (email === "") {
  //         alert("กรุณาตรวจสอบอีเมล");
  //       } else if (password === "") {
  //         alert("กรุณากตรวจสอบpassword");
  //       } else {
  //         console.log("กรอกครบแล้ว");
  //       }
  //     });
  // };

  const checkuser = async () => {
    console.log("emailpassword", email, password);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log("error: ", error);
      // alert(error.message)
      if (error.code === 'auth/internal-error') {
        MessageBox.Alert("แจ้งเตือน", "Email หรือ รหัสผ่านของคุณไม่ถูกต้อง");
      }
      if (error.code === 'auth/user-not-found') {
        MessageBox.Alert("แจ้งเตือน", "ไม่พบบัญชีผู้ใช้นี้");
      }
      if (error.code === 'auth/wrong-password') {
        MessageBox.Alert("แจ้งเตือน", "กรุณากรอกรหัสผ่านของคุณให้ถูกต้อง");
      }
      if (error.code === 'auth/invalid-email') {
        MessageBox.Alert("แจ้งเตือน", "Email ของคุณไม่ถูกต้อง");
      }
    }
  }

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
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Image source={require("../assets/image/Logormutp.png")} />
          </View>
          <View
            style={{
              width: "100%",
              height: "35%",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            <Text
              style={{
                marginRight: "70%",
                marginTop: 10,
                fontSize: 20,
                color: "white",
              }}
            >
              Login
            </Text>
            <Text
              style={{
                marginRight: "70%",
                marginTop: 20,
                color: "#808080"
              }}
            >
              E-mail
            </Text>
            <View
              style={{
                backgroundColor: "white",
                width: "80%",
                height: 50,
                borderRadius: 7,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Fontisto
                style={{
                  marginTop: 13,
                  marginRight: "1%",
                  marginLeft: "5%",
                }}
                name="email"
                size={24}
                color="#808080"
              />
              <TextInput
                placeholderTextColor="#808080"
                placeholder="Email"
                onChangeText={(Text) => setemail(Text)}
              ></TextInput>
            </View>
            <Text
              style={{
                marginRight: "63%",
                marginTop: 20,
                color: "#808080"
              }}
            >
              Password
            </Text>
            <View
              style={{
                backgroundColor: "white",
                width: "80%",
                height: 50,
                borderRadius: 7,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <AntDesign
                style={{
                  marginLeft: "5%",
                  marginTop: 10
                }}
                name="lock"
                size={24}
                color="#808080"
              />
              <TextInput
                placeholderTextColor="#808080"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(Text) => setpassword(Text)}
                style={{
                  width: 250,
                }}
              ></TextInput>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: "60%",
                  color: "white"
                }}
              >
                ลืมรหัสผ่าน ?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: "20%",
              // backgroundColor:"blue"
            }}
          >
            <TouchableOpacity
              onPress={() => checkuser()}
              style={{
                width: "70%",
                height: 40,
                backgroundColor: "#6A74CF",
                marginTop: 50,
                marginLeft: "15%",
                borderRadius: 20,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  justifyContent: "center",
                  marginLeft: "40%",

                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("register")}
              style={{
                width: "70%",
                height: 40,
                backgroundColor: "#6A74CF",
                marginTop: 15,
                marginLeft: "15%",
                borderRadius: 20,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  justifyContent: "center",
                  marginLeft: "35%",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

    </View>
  );
}
