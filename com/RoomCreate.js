import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { ref, get, child, set, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import app from "../firebase";
import Geocode from "react-geocode";
import { async } from "@firebase/util";

const RoomCreate = () => {
  const navigation = useNavigation();
  const db = getDatabase(app);
  const [room, setRoom] = useState("");
  const [pass, setPass] = useState("");
  const [home, setHome] = useState("");
  s;
  const [address, setAddress] = useState("");
  const handleSignUp = () => {
    if (room !== "" && pass !== "" && home !== "") {
      Geocode.setApiKey("AIzaSyBJoGEJJd79nIexOoBgFmSoSPWsU-EbYw4"),
        Geocode.fromAddress(home).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            setAddress({ latitude: lat, longitude: lng });
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      alert("何処か空だよ");
    }
  };
  useEffect(() => {
    if (room !== "" && pass !== "" && address !== "") {
      set(ref(db, `room/${room}`), {
        name: room,
        pass: pass,
        home: address,
        task: [
          {
            user: "",
            key: "料理を作る",
            bool: false,
            check: false,
          },
          {
            user: "",
            key: "洗濯物をたたむ",
            bool: false,
            check: false,
          },
          {
            user: "",
            key: "お風呂を洗う",
            bool: false,
            check: false,
          },
          {
            user: "",
            key: "買い物に行く",
            bool: false,
            check: true,
          },
        ],
        user1: {
          name: "",
          id: "",
          color: "",
        },
        user2: {
          name: "",
          id: "",
          color: "",
        },
      });
      navigation.navigate("RoomScreen", { room: room });
    }
  }, [address]);
  return (
    <KeyboardAvoidingView behavior="padding">
      <View
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "100%",
        }}
      >
        <View>
          <Text style={styles.yours1}>ふたりのこと</Text>
          <Text style={styles.yours2}>教えてください</Text>
        </View>
        <View>
          <Text style={styles.title1}>ルーム名</Text>
          <TextInput
            value="hoge"
            style={{
              alignSelf: "flex-start",
              borderWidth: 1,
              borderColor: "#ACACAC",
              height: 48,
              width: "90%",
              marginLeft: "5%",
              paddingLeft: "2%",
              borderRadius: 8,
              fontSize: 16,
              color: "#333333",
            }}
            placeholder="ルーム名を入力してください"
            onChangeText={(text) => setRoom(text)}
            keyboardType="default"
          />
          <Text style={styles.title2}>ふたりの合言葉</Text>
          <TextInput
            placeholder="ふたりの合言葉を入力してください"
            onChangeText={(text) => setPass(text)}
            keyboardType="default"
            style={{
              alignSelf: "flex-start",
              borderWidth: 1,
              borderColor: "#ACACAC",
              height: 48,
              width: "90%",
              marginLeft: "5%",
              paddingLeft: "2%",
              borderRadius: 8,
              fontSize: 16,
              color: "#333333",
            }}
          />
          <Text style={styles.title2}>住所</Text>
          <TextInput
            placeholder="(例) 東京都新宿区百人町1-10-100"
            onChangeText={(text) => setHome(text)}
            keyboardType="default"
            style={{
              alignSelf: "flex-start",
              borderWidth: 1,
              borderColor: "#ACACAC",
              height: 48,
              width: "90%",
              marginLeft: "5%",
              paddingLeft: "2%",
              borderRadius: 8,
              fontSize: 16,
              color: "#333333",
            }}
          />
          <Text
            style={{
              fontSize: 12,
              // color: "#FAB659",
              color: "#333333",
              paddingTop: "2%",
              paddingLeft: "7%",
            }}
          >
            ※帰宅時刻を割り出すときにのみ利用されます。
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleSignUp}
            style={{
              backgroundColor: "#FFAA36",
              width: "90%",
              height: 50,
              borderRadius: 8,
              marginLeft: "5%",
              marginTop: "10%",
              shadowColor: "#333333",
              shadowOffset: {
                height: 3,
              },
              shadowRadius: 3,
              shadowOpacity: 0.3,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: "4%",
              }}
            >
              次へ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RoomCreate;

const styles = StyleSheet.create({
  yours1: {
    color: "#FFAA36",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "12%",
  },
  yours2: {
    color: "#FFAA36",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "12%",
  },
  title1: {
    fontSize: 16,
    marginLeft: "7%",
    marginBottom: 16,
  },
  title2: {
    fontSize: 16,
    marginLeft: "7%",
    marginBottom: 16,
    marginTop: "6%",
  },
});
