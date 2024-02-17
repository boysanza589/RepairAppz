import { View, Image, Text, TextInput, TouchableOpacity, FlatList, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


// Data for search suggestion (replace with your actual data)
const data = [
  { id: 1, name: 'Repair request 1' },
  { id: 2, name: 'Repair request 2' },
  { id: 3, name: 'Repair request 3' },
];
//

const FirstRoute = () => (
  <View style={{
    width:370,
    height:370,
    backgroundColor:"white",
    marginLeft:20,
    marginTop:40,
    borderRadius:20
  }}>
    <View style={{
        width:330,
        height:165,
        backgroundColor:"white",
        marginTop:20,
        marginLeft:20,
        
    }}>
        <View style={{
            flexDirection:"row"
        }}>
    <Image style={{
        width:70,
        height:70,
        marginLeft:20,
        marginTop:20
        
    }} source={require("../assets/icon.png")}/>
    
    <View style={{
        flexDirection:"row",
        marginTop:20,
    }}>
        <Text style={{
            marginLeft:10
        }}>คอมพิวเตอร์</Text>
        <Text style={{
            marginLeft:60,
            color:"red"
        }}>รอการอนุมัติ</Text>
        </View>
    </View>
    <Text style={{
        marginLeft:20,
        marginTop:10
    }}>รายละเอียด</Text>
    <Text style={{
        marginTop:15,
        marginLeft:20
    }}>กำหนดเสร็จ : 07/12/2020</Text>
    </View>
    <View style={{
        width:330,
        height:165,
        backgroundColor:"white",
        marginTop:1,
        marginLeft:20,
        
    }}>
        <View style={{
            flexDirection:"row"
        }}>
    <Image style={{
        width:70,
        height:70,
        marginLeft:20,
        marginTop:20
        
    }} source={require("../assets/icon.png")}/>
    
    <View style={{
        flexDirection:"row",
        marginTop:20,
    }}>
        <Text style={{
            marginLeft:10
        }}>สายไฟ</Text>
        <Text style={{
            marginLeft:85,
            color:"red"
        }}>รอการอนุมัติ</Text>
        </View>
    </View>
    <Text style={{
        marginLeft:20,
        marginTop:10
    }}>รายละเอียด</Text>
    <Text style={{
        marginTop:15,
        marginLeft:20
    }}>กำหนดเสร็จ : 07/12/2020</Text>
    </View>
  </View>
);



const SecondRoute = () => (
    <View style={{
        width:370,
        height:205,
        backgroundColor:"white",
        marginLeft:20,
        marginTop:40,
        borderRadius:20
      }}>
        <View style={{
            width:330,
            height:165,
            backgroundColor:"white",
            marginTop:20,
            marginLeft:20,
            
        }}>
            <View style={{
                flexDirection:"row"
            }}>
        <Image style={{
            width:70,
            height:70,
            marginLeft:20,
            marginTop:20
            
        }} source={require("../assets/icon.png")}/>
        
        <View style={{
            flexDirection:"row",
            marginTop:20,
        }}>
            <Text style={{
                marginLeft:10
            }}>สายอินเตอร์เน็ต</Text>
            <Text style={{
                marginLeft:60,
                color:"orange"
            }}>กำลังดำเนินการ</Text>
            </View>
        </View>
        <Text style={{
            marginLeft:20,
            marginTop:10
        }}>รายละเอียด</Text>
        <Text style={{
            marginTop:15,
            marginLeft:20
        }}>กำหนดเสร็จ </Text>
        </View>
      </View>
    );

const ThreeRoute = () => (
    <View style={{
        width:370,
        height:205,
        backgroundColor:"white",
        marginLeft:20,
        marginTop:40,
        borderRadius:20
      }}>
        <View style={{
            width:330,
            height:165,
            backgroundColor:"white",
            marginTop:20,
            marginLeft:20,
            
        }}>
            <View style={{
                flexDirection:"row"
            }}>
        <Image style={{
            width:70,
            height:70,
            marginLeft:20,
            marginTop:20
            
        }} source={require("../assets/icon.png")}/>
        
        <View style={{
            flexDirection:"row",
            marginTop:20,
        }}>
            <Text style={{
                marginLeft:10
            }}>สายอินเตอร์เน็ต</Text>
            <Text style={{
                marginLeft:90,
                color:"#00D668"
            }}>สำเร็จ</Text>
            </View>
        </View>
        <Text style={{
            marginLeft:20,
            marginTop:10
        }}>รายละเอียด</Text>
        <Text style={{
            marginTop:15,
            marginLeft:20
        }}>กำหนดเสร็จ </Text>
        </View>
      </View>
    );

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  three: ThreeRoute,
});

export default function trackstatus( {navigation} ) {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data); // Initialize with full data

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    // Filter data based on search text
    setFilteredData(
      data.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  // const renderItem = ({ item }) => (
  //   <View>
  //     {/* Display repair request details based on `item` data */}
  //     <Text>{item.name}</Text>
  //   </View>
  // );

  const layout = useWindowDimensions();
  const renderTabBar = porps =>(
    
    <TabBar {
        ...porps 
    }
    indicatorStyle ={{
        backgroundColor:"black"
    }}
     style={{
        backgroundColor:"white"

    }}
        renderLabel={({route,color})=>(
            <Text style={{
                color:"#B3B3B3"
            }}>
                {route.title}
            </Text>
        )}
    />  
   )
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'รายการรออนุมัติ' },
    { key: 'second', title: 'กำลังดำเนินการ' },
    { key: 'three', title: 'รายการที่สำเร็จ' },
  ]);

  return (
    
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#DEC4FC', '#91C6FC']}
        style={{ width: '100%', height: '100%' }}
      >
        
        <View style={{  width: '100%', height: '13%', backgroundColor: '#583C81',}}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 60,
            marginLeft: 15,
            marginRight: 60,
          }}>
            <TouchableOpacity 
            onPress={() => navigation.navigate("menuhome")}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, color: 'white',marginRight:25 }}>ติดตามสถานะใบแจ้งซ่อม</Text>
          </View>
        </View>
        
          <View style={{
           
            width:"100%",
            height:70,
            backgroundColor:"white",
            alignItems:"center",
          }}>
            <View style={{
            
            borderWidth:1,
            width:350,
            height:50,
            borderRadius:10,
            marginTop:10,
            borderColor:"#CCCCCC",
            flexDirection:"row",
            alignItems:"center",
            
            
            }}>
            <Ionicons style={{
                marginLeft:10
             }} name="search" size={24}  color="#CCCCCC" />
                <TextInput
                placeholder="Search..."
                value={searchText}
                onChangeText={handleSearchTextChange}
                >
                </TextInput>
                
            </View>
           
          </View>
            <TabView 
            
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
            />
            
      </LinearGradient>
    </View>
    
  );
}

