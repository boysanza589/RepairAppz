import {View, Image, TextInput, Text, TouchableOpacity, ScrollView, HorizontalScrollView, Modal } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../Screen/data"
import ImagePicker from 'react-native-image-picker';




export default function repair({ navigation }) {
  const [kana, setKana] = useState("");
  const [name, setName] = useState("");
  const [numbernisit, setNumbernisit] = useState("");
  const [phonenumber, setNumPhonenumber] = useState("");
  const [email , setEmail ] = useState ("")
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  const[ modal,setModal ]=useState( false )

  

  const gomodal =()=>{
    setModal( true )
  }
  const openModal =()=>{
    console.log("openModal",openModal)
  }

  const handlePickImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.uri) {
        setImage(response.uri);
      }
    });
  
      


    return(
     <>
      <View>
      <Modal 
      animationType="fade"
      transparent={ true }
      visible={modal}
      
      ><View onPress={( )=>setModal( false )}
      style={{
        flex:1,
        // backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
      }}
      >
        <View disabled={false} style={{
          width:380,
          height:370,
          backgroundColor:"white",
          borderRadius:20
        }}><View style={{
          alignItems:"center",
          marginTop:20
        }}> 
          <Image source={require("../assets/image/msg.png")}/>
          <Text style={{
            marginTop:20,
            fontSize:21
          }}>ยืนยันการส่งข้อมูล</Text>
          <Text style={{
            marginTop:10,
            fontSize:15
          }}>ข้อมูลที่ถูกส่งไปจะไม่สามารถกลับมาแก้ไขได้</Text>
          
        </View>
        <View style={{
          alignItems:"center",
          flexDirection:"row",
          justifyContent:"space-around",
          marginTop:30,
          
        }}>
        <TouchableOpacity 
        onPress={() =>setModal(false)}
        style={{
          width:150,
          height:40,
          color:"#CCCCCC",
          borderRadius:20,
          borderWidth:1,
          alignItems:"center",
          justifyContent:"center"
        }}><Text style={{

        }}>ยกเลิก</Text>
      
        </TouchableOpacity>
        
        <TouchableOpacity 
        
        style={{
          width:150,
          height:40,
          backgroundColor:"#00BF9D",
          borderRadius:20,
          alignItems:"center",
          justifyContent:"center"
        }}><Text style={{
            color:"white"
        }}>ส่งเรื่อง</Text>

        </TouchableOpacity>

        </View>

        </View>

      </View>

      </Modal>


      </View>
      </>
    )
  }
  return (
    
    <View
      style={{
        flex: 1,
      }}
    >
      {openModal ()}
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
            width: "100%",
            height: "10%",
            backgroundColor: "#583C81",
          }}
        >
          <Text
            style={{
              color: "white",
              marginTop: "15%",
              marginLeft: "42%",
              fontSize: 20,
            }}
          >
            แจ้งซ่อม
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("menuhome")}
            style={{
              bottom:25,
              marginLeft: 20,
            }}
          >
            <Ionicons name="chevron-back-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "white",
            justifyContent:"center"
          }}
        >
          <Text style={{
            color:"#808080",
            fontSize:15,
            marginTop:30,
            marginLeft:"7%"
            
          }}>ข้อมูลและรายการ
          </Text>
          <TouchableOpacity 
          onPress={()=>gomodal()}
          style={{
            width:125,
            height:30,
            backgroundColor:"#00BF9D",
            marginLeft:280,
            bottom:25,
            borderRadius:12
        }}>
          <FontAwesome style={{
            marginLeft:15,
            marginTop:5
          }} name="send" size={20} color="white" />
        <Text style={{
          color:"white",
          bottom:20,
          marginLeft:45
        }}>ทำรายการ
        </Text>
        </TouchableOpacity>
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
           onChangeText={(Text) => setKana(Text)}
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
           onChangeText={(Text) => setName(Text)}
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
          onChangeText={(Text) => setNumbernisit(Text)}
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
           onChangeText={(Text) => setNumPhonenumber(Text)}
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
           onChangeText={(Text) => setEmail(Text)}
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
           onChangeText={(Text) => setDate(Text)}
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
           onChangeText={(Text) => setTime(Text)}
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
          onChangeText={(Text) => setRoom(Text)}
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
          onChangeText={(Text) => setDetail(Text)}
          placeholder="รายละเอียดเพิ่มเติม"
          style={{
            borderBottomWidth:1,
            padding:5,
            borderColor:"#CCCCCC",
            width:300,
            marginLeft:20,
          }}></TextInput>
          </View> 
          
          <View style={{
            width: 350,
            height: 240,
            backgroundColor:"white",
            marginTop:15,
            marginLeft:30,
            borderRadius:20,
            bottom:5,
            justifyContent:"center"
          }}>
            <Text style={{
            marginBottom:20,
            marginLeft:20,
            
          }}>รายการ</Text>

            <View style={{
              alignItems:"center",
              justifyContent:"center",
              marginBottom:10
            }}>
            <FontAwesome6 name="photo-film" size={50} color="#CCCCCC" />
            <Text style={{
              marginTop:15,
              color:"#CCCCCC"
            }}>เพิ่มรายการแจ้งซ่อมของคุณ</Text>
            <Text style={{
              marginRight:5,
              color:"#CCCCCC"
            }}>เพื่อแจ้งให้ช่างทราบ</Text>
            </View>
            <View style={{
              alignItems:"center",
              marginBottom:20
            }}>
            <TouchableOpacity 
            onPress={handlePickImage}
            style={{
              justifyContent:"center",
              width:120,
              height:30,
              backgroundColor:"#00BF9D",
              borderRadius:20,
              
            }}>{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              <Text style={{
              marginLeft:20,
              color:"white"
            }}>แตะเพื่ออัพโหลด</Text>


            </TouchableOpacity>
            </View>


          </View>

















































        </ScrollView>
      </LinearGradient>
      
    </View>
    
  );
}
