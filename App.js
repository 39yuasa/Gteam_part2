import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserCreate from "./com/UserCreate";
import LoginScreen from "./com/LoginScreen";
import CheckScreen from "./com/CheckScreen";
import HomeScreen from "./com/Home";
import RoomScreen from "./com/RoomScreen";
import RoomCreate from "./com/RoomCreate";
import RoomLogin from "./com/RoomLogin";
import MailAddress from "./com/Mail";
// import Api from "./com/Api";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mail" component={MailAddress} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RoomScreen" component={RoomScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={(route) => (
            console.log(route.route.params.room),
            {
              headerBackTitleVisible: false,
              title: route.route.params.room,
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerTintColor: "#333333",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 18,
              },
            }
          )}
        />
        <Stack.Screen name="User" component={CheckScreen} />
        <Stack.Screen name="RoomCreate" component={RoomCreate} />
        <Stack.Screen name="RoomLogin" component={RoomLogin} />
        <Stack.Screen name="UserCreate" component={UserCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
