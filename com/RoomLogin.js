import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { ref, get, child } from "firebase/database";
import { useState } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import db from "../firebase";
const RoomLogin = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const [room, setRoom] = useState("");
  const [pass, setPass] = useState("");
  const handleLogin = () => {
    const RoomData = ref(db);
    console.log(RoomData);
    get(child(RoomData, `room/${room}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        data.pass == pass
          ? navigation.navigate("RoomScreen", { rooms: data, room: room })
          : alert("パスワードが間違えています");
      } else {
        alert("そんなルーム名は存在しません");
      }
    });
  };
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
          <Text style={styles.yours1}>
            ふたりのこと
          </Text>
          <Text style={styles.yours2}>
            教えてください
          </Text>
        </View>
        <View>
          <Text style={styles.title1}>ルーム名</Text>
          <TextInput
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
              color: "#333333"
            }}
            placeholder="ルーム名を入力してください"
            onChangeText={(text) => setRoom(text)}
          />
          <Text style={styles.title2}>
            ふたりの合言葉
          </Text>
          <TextInput
            placeholder="ふたりの合言葉を入力してください"
            onChangeText={(text) => setPass(text)}
            secureTextEntry
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
              color: "#333333"
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "#FFAA36",
              width: "90%",
              height: 50,
              borderRadius: 5,
              borderWidth: 0,
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
                color: "white",
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
export default RoomLogin;

const styles = StyleSheet.create({
  yours1: {
    color: "#FFAA36",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "29%",
  },
  yours2: {
    color: "#FFAA36",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "29%",
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
