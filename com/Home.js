import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
} from "react-native";
import { useState } from "react";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import iphone_8___se_____14 from "../assets/iphone_8___se_____14.png";
import hello from "../assets/hello.png";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

const HomeScreen = (data) => {
  const GOOGLE_API_KEY = "AIzaSyDmiqSHNcm6aqEZfNW_TtyS360_DxsPQWg";
  const navigation = useNavigation();
  console.log(data.route.params);
  const { room, user } = data.route.params;
  console.log(user);

  const [error, setErrorMessage] = useState("");
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [text, setText] = useState("変更前");
  const handleReturn = () => {
    async function Int() {
      try {
        if (Platform.OS !== "web") {
          // console.log("platですよ");
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            // console.log("return動いたよ");
            setErrorMessage("位置情報サービスをオンにしてください。");
            return;
          }
        }
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        // console.log(latitude);
        setLatitude(latitude);
        setLongitude(longitude);
      } catch {
        console.log(error);
      }
    }
    Int();
    navigation.navigate("User", {
      index: room,
      user: user,
      latitude: Latitude,
      longitude: Longitude,
    });
  };

  return (
    <View>
      <ImageBackground
        source={iphone_8___se_____14}
        resizeMode="cover"
        style={styles.Images}
      >
        {/* <Image
          source={hello}
          alt="猫"
          style={{ width: "80%", marginLeft: "10%", marginTop: 180, zIndex: 1 }}
        /> */}
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={handleReturn}
            style={{
              backgroundColor: "#FFAA36",
              width: "42%",
              height: 47,
              borderRadius: 5,
              borderWidth: 0,
              overflow: "hidden",
              marginLeft: "6%",
              marginTop: 240,
              zIndex: 2,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              家に帰る
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert("(仮)ありがとうを送信しました。")}
            style={{
              backgroundColor: "#FFAA36",
              width: "42%",
              height: 47,
              borderRadius: 5,
              borderWidth: 0,
              overflow: "hidden",
              marginTop: 240,
              marginLeft: "3%",
              zIndex: 2,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              ありがとう
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    color: `#0000ff`,
  },
  // Images: {
  //   height: "100vh",
  //   width: "100%",
  // },
});
