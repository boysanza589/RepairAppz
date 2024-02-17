import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from "./Screen/login"
import menuhome from "./Screen/menuhome";
import repair from "./Screen/repair";
import register from "./Screen/register";
import profile from "./Screen/profile";
import trackstatus from "./Screen/trackstatus";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen 
      name="login" 
      component={login}
      options={{ headerShown:false}} /> 

      <Stack.Screen 
      name="menuhome" 
      component={menuhome}
      options={{ headerShown:false}} /> 

      <Stack.Screen 
      name="repair" 
      component={repair}
      options={{ headerShown:false}} /> 

      <Stack.Screen 
      name="register" 
      component={register}
      options={{ headerShown:false}} /> 
      
      <Stack.Screen 
      name="profile" 
      component={profile}
      options={{ headerShown:false}} /> 

      <Stack.Screen 
      name="trackstatus" 
      component={trackstatus}
      options={{ headerShown:false}} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}