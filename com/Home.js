import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import iphone_8___se_____14 from "../assets/iphone_8___se_____14.png";
import hello from "../assets/hello.png";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import app from "../firebase";
import { ref, onValue, set, get, child, getDatabase } from "firebase/database";

const HomeScreen = (data) => {
  const navigation = useNavigation();
  const { room, user } = data.route.params;
  const [error, setErrorMessage] = useState("");
  const [dress, setDress] = useState("");
  const [text, setText] = useState("変更前");
  const db = getDatabase(app);
  const RoomData = ref(db);
  useEffect(() => {
    async function Int() {
      try {
        if (Platform.OS !== "web") {
          console.log("platですよ");
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrorMessage("位置情報サービスをオンにしてください。");
            return;
          }
        }
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        console.log(latitude);
        setDress({ latitude: latitude, longitude: longitude });
      } catch {
        console.log(error);
      }
    }
    Int();
    // get(
    //   child(RoomData, `room/${room}/${user == "user1" ? "user1" : "user2"}/`)
    // ).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     const Data = snapshot.val();
    //     console.log(Data.id);
    //     // setExpoId(Data.id);
    //   } else {
    //     console.log("No data available");
    //   }
    // });
  }, []);

  const handleReturn = () => {
    console.log(dress);
    navigation.navigate("User", {
      index: room,
      user: user,
      address: dress,
    });
  };

  const handleGoto = () => {
    console.log("handleGo");
    navigation.navigate("User", {
      index: room,
      user: user,
      address: dress,
    });
  };
  const one = require("../assets/one.png");
  const oneImage = Image.resolveAssetSource(one);
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
        <View>
          {/* homeと行き来するボタン */}
          <TouchableOpacity onPress={handleGoto}>
            <View>
              <Image
                source={{ uri: oneImage.uri }}
                style={{ width: 10, height: 10 }}
              />
              <Text>ToDo</Text>
            </View>
          </TouchableOpacity>
        </View>
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
});
