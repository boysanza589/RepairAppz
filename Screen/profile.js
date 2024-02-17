import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Modal, ScrollView} from 'react-native'
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { firebase } from "../Screen/data"
import { MaterialCommunityIcons } from '@expo/vector-icons';




export default function profile({ navigation }) {
  const $linq = (arr) => new linq(arr);
  const [modalEdit, setModalEdit] = useState(false)
  const [isUser, setUser] = useState(false)
  const [modalExit, setModalExit] = useState(false)
  const [modalDeleted, setModalDeleted] = useState(false)

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
        setUser(doc.data())
      }
    })
  }

  const logout = () => {
    setmodal(false)
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  

  const gomodal =()=>{
    setModalEdit( true )
    
  }
  const gomodalExit =()=>{
    setModalExit( true )
    
  }
  const gomodalDeleted =()=>{
    setModalDeleted( true )
    
  }

  const openModalExit = () => {
    return (
      <>
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalExit}
          >
            <View onPress={() => openModalExit(false)} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" }}>
              <View disabled={false} style={{
                width: 313,
                height: 279,
                backgroundColor: "#ffff",
                alignItems: "center",
                // justifyContent:"center", 
                position: "absolute",
                borderRadius: 24
              }}>

                <View style={{ marginTop: 23, alignItems: "center",justifyContent:"center"  }}>
                <MaterialCommunityIcons name="exit-run" size={50} color="black" />
                  <View style={{ position: "absolute", marginTop: 15, marginLeft: 40 }}>

                  </View>
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text style={{ marginTop: 23 }}
                  >ยืนยันการออกจากระบบหรือไม่</Text>
                </View>


                <View style={{ flexDirection: "row", marginTop: 34 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("login")}>

                    <View style={{ width: 108, height: 43, backgroundColor: "#AB88C9", borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#ffff" }}>ตกลง</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setModalExit(false)}>
                    <View style={{ width: 108, height: 43, borderColor: "#AB88C9", marginLeft: 19, borderWidth: 2, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#AB88C9" }}>ยกเลิก</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </Modal>
        </View>
      </>
    )
  }

  const openModalDeleted = () => {
    return (
      <>
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalDeleted}
          >
            <View onPress={() => setModalDeleted(false)} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" }}>
              <View disabled={false} style={{
                width: 313,
                height: 279,
                backgroundColor: "#ffff",
                alignItems: "center",
                // justifyContent:"center", 
                position: "absolute",
                borderRadius: 24
              }}>

                <View style={{ marginTop: 40, alignItems: "center",justifyContent:"center"  }}>
                <MaterialCommunityIcons name="delete-alert-outline" size={50} color="red" />
                  <View style={{ position: "absolute", marginTop: 15, marginLeft: 40 }}>

                  </View>
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text style={{ marginTop: 23 }}
                  >คุณต้องการจะลบโครงการใช่หรือไม่</Text>
                </View>


                <View style={{ flexDirection: "row", marginTop: 34 }}>
                  <TouchableOpacity
                    // onPress={() => navigation.navigate("login")}
                    >

                    <View style={{ width: 108, height: 43, backgroundColor: "red", borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#ffff" }}>ตกลง</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setModalDeleted(false)}>
                    <View style={{ width: 108, height: 43, borderColor: "gray", marginLeft: 19, borderWidth: 2, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "gray" }}>ยกเลิก</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </Modal>
        </View>
      </>
    )
  }

  const openModal =()=>{
    console.log("openModal",openModal)

    
    return(
     <>
      <View>
      <Modal 
      animationType="fade"
      transparent={ true }
      visible={modalEdit}

      ><View onPress={( )=>setModalEdit( false )}
      style={{
        flex:1,
        // backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
      }}
      >
        <ScrollView>
        <View disabled={false} style={{
          width:380,
          height:800,
          backgroundColor:"white",
          borderRadius:20
        }}>
          <View style={{
            marginTop:10,
            marginLeft:330,
            padding:10
          }}><TouchableOpacity 
          onPress={() => setModalEdit(false)}>
            <Feather name="x" size={24} color="#0AAFC1" />
            </TouchableOpacity>
          </View>
          <View style={{
            justifyContent:"space-between",
            flexDirection:"row",
            paddingHorizontal:25,
            
          }}>
            
          <Text style={{

          }}>คอมพิวเตอร์

          </Text>
          <Text style={{
            color:"#20A6F2"
          }}
          >รายการที่ยังไม่เสร็จ
          </Text>
          </View>
          <View style={{
          width:"85%",
          backgroundColor:"white",
          marginLeft:"8%",
          marginTop:"5%",
          borderRadius:20
        }}>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            ข้อมูล
          </Text>
          <Text style={{
            marginTop:15,
            marginLeft:20
          }}>
            คณะ
          </Text>
          <View>
          <TextInput 
           placeholder="กรุณากรอกคณะ"
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            ชื่อ-นามสกุล
          </Text>
          <View>
          <TextInput 
           placeholder="กรุณากรอกชื่อ-นามสกุล"
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            หมายเลขบัตรประจำตัวประชาชน/รหัสนักศึกษา
          </Text>
          <View>
          <TextInput 
          placeholder="กรุณากรอกหมายเลข"
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            เบอร์โทรศัพท์
          </Text>
          <View>
          <TextInput 
           placeholder="กรุณากรอกคณะ"
           keyboardType="phone-pad"
           maxLength={10}
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            E-mail
          </Text>
          <View>
          <TextInput 
           placeholder="กรุณากรอกอีเมล"
           autoComplete="Email"
         
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            วันที่สะดวก
          </Text>
          <View>
          <TextInput 
           placeholder="วว/ดด/ปป"
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            ช่วงเวลา
          </Text>
          <View>
          <TextInput
           
          placeholder="เวลา"
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            ระบุห้องเรียน
          </Text>
          <View>
          <TextInput 
           placeholder="ระบุห้องเรียน"
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View>
          <Text style={{
            marginTop:20,
            marginLeft:20
          }}>
            รายละเอียดเพิ่มเติม
          </Text>
          <TextInput 
          placeholder="รายละเอียดเพิ่มเติม"
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          <View style={{
            alignItems:"center",
            justifyContent:"center",
            width:130,
            height:35,
            backgroundColor:"#00BF9D",
            marginLeft:100,
            marginTop:20,
            borderRadius:10
          }}>
            <TouchableOpacity style={{
              width:100,
              marginLeft:65
            }}><Text
            style={{
              color:"white"
            }}>บันทึก</Text>

            </TouchableOpacity>
          </View>
          </View> 
        </View>
          </ScrollView>
      </View>

      </Modal>

          
      </View>
      </>
    )
  }
  return (
    <View style={{
      flex:1
    }}>
      {openModal ()}
      {openModalExit ()}
      {openModalDeleted ()}
      <LinearGradient
      colors={["#DEC4FC","#91C6FC"]}
      style={{
        width:"100%",
        height:"100%"
      }}
      >
        <View
          style={{
            width: "100%",
            height: "13%",
            backgroundColor: "#583C81",
          }}
        >
        <View style={{
          alignItems:"center",
          justifyContent:"space-between",
          flexDirection:"row",
          marginTop:60,
          paddingHorizontal:20
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("menuhome")}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{
            fontSize: 20,
            color:"white"
            
        }}>โปร์ไฟล์
        </Text>
          <TouchableOpacity 
          onPress={() => gomodalExit()}
          >
          <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        </View>
        <View style={{
          flex:2,
          
        }}>
          <View style={{
            
            width:420,
            height:200,
            alignItems:"center",
            marginTop:40
          }}>
          <Image style={{
            width:70,
            height:70,
            resizeMode:"contain"
          }} source={require("../assets/image/Avatar.png")}/>
          <Text style={{
            fontSize: 20,
            color:"white",
            lineHeight:70
        }}>
          {isUser.displayName}
        </Text>
        <Text style={{
            fontSize: 15,
            color:"white",
            bottom:10
        }}>{isUser.email}
        </Text>
        <View
          style={{
            width: "100%",
            height: "25%",
            backgroundColor: "#F2F2F2",
            marginTop:10,
            justifyContent:"center"
            
          }}
        >
          <Text style={{
            marginLeft:20
          }}>รายการ

          </Text>
        
          </View>
        </View>
          <View style={{
            width:415,
            height:70,
            backgroundColor:"white",
            marginTop:20
          }}
          >
            <View style={{
              flexDirection:"row",
              justifyContent:"space-between",
              paddingHorizontal:20,
              marginTop:10
            }}>
              <Text style={{

            }}>คอมพิวเตอร์

            </Text>
            <TouchableOpacity
            onPress={()=>gomodal()}
            >
            <FontAwesome name="edit" size={20} color="yellow" /></TouchableOpacity>
            </View>
            <View style={{
              flexDirection:"row",
              justifyContent:"space-between",
              paddingHorizontal:20,
              marginTop:5

            }}>
            <Text style={{
              
            }}>วันที่เริ่ม

            </Text>
            <Text style={{
              color:"#00BF9D",
              marginRight:220
              
            }}>12/02/2023
              
            </Text>
            <TouchableOpacity 
            onPress={()=>gomodalDeleted()}
            >
            <AntDesign name="delete" size={20} color="red" /></TouchableOpacity>
            </View>



          </View>

          <View style={{
            width:415,
            height:70,
            backgroundColor:"white",
          }}
          >
            <View style={{
              flexDirection:"row",
              justifyContent:"space-between",
              paddingHorizontal:20,
              marginTop:10
            }}>
              <Text style={{

            }}>คีย์บอร์ด

            </Text>
            <TouchableOpacity 
            onPress={()=>gomodal()}
            >
            <FontAwesome name="edit" size={20} color="yellow" /></TouchableOpacity>
            </View>
            <View style={{
              flexDirection:"row",
              justifyContent:"space-between",
              paddingHorizontal:20,
              marginTop:5

            }}>
            <Text style={{
              
            }}>วันที่เริ่ม

            </Text>
            <Text style={{
              color:"#00BF9D",
              marginRight:220
              
            }}>12/02/2023
              
            </Text>
            <AntDesign name="delete" size={20} color="red" />
            </View>



          </View>

          <View style={{
            width:415,
            height:70,
            backgroundColor:"white",
          }}
          >
            <View style={{
              flexDirection:"row",
              justifyContent:"space-between",
              paddingHorizontal:20,
              marginTop:10
            }}>
              <Text style={{

            }}>เมาส์

            </Text>
            <TouchableOpacity
             onPress={()=>gomodal()}
             
            >
            <FontAwesome name="edit" size={20} color="yellow" />
            </TouchableOpacity>
            </View>
            <View style={{
              flexDirection:"row",
              justifyContent:"space-between",
              paddingHorizontal:20,
              marginTop:5

            }}>
            <Text style={{
              
            }}>วันที่เริ่ม

            </Text>
            <Text style={{
              color:"#00BF9D",
              marginRight:220
              
            }}>12/02/2023
              
            </Text>
            <AntDesign name="delete" size={20} color="red" />
            </View>



          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

