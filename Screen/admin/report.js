import { View, Image, TextInput, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { firebase } from "../../Screen/data"
import { Ionicons } from '@expo/vector-icons';

export default function Report({ navigation }) {
    const [isMyReport, setMyReport] = useState([]);

    const IsMyReport = () => {
        let me = firebase.auth().currentUser.uid;
        const docRef = firebase.firestore().collection('users').doc(me)
        console.log("docRef: ", docRef);
        docRef.onSnapshot((doc) => {
            if (doc.exists) {
                console.log("ฉันเอง: ", doc.data());
                if (doc.data().role) {
                    setMyReport(doc.data().report)
                }
            }
        })
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
            }}
        >
            <View style={{ backgroundColor: "#583C81", width: "100%", alignItems: "center", paddingVertical: 30, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" style={{ marginLeft: 20 }} />
                </TouchableOpacity>
                <View style={{ marginLeft: "25%", }}>
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                        รายการแจ้งซ่อม
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: "#F3F3F3", width: "100%", paddingLeft: 15, paddingVertical: 15, }}>
                <Text style={{ color: "#808080" }}>
                    รายการ
                </Text>
            </View>
            {isMyReport.length == 0
                ? < View style={{ flex: 1, width: "100%", paddingLeft: 120, paddingTop: 60 }}>
                    <Text>ยังไม่มีรายการในขณะนี้....</Text>
                </View>
                : <View>
                    <Text>555</Text>
                </View>
            }
        </View >
    );
}
