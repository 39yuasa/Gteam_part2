import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
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
    get(child(RoomData, `room/${room}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
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
      <View style={{minHeight: '50%', paddingTop: '40%'}}>
      <Text style={{color: '#FFAA36',fontWeight: 'bold',fontSize: 40,textAlign: 'center'}}>ふたりのこと</Text>
      <Text style={{color: '#FFAA36',fontWeight: 'bold',fontSize: 40,textAlign: 'center'}}>教えてください</Text>
      </View>
      <View>
        <Text style={{paddingLeft: '7%', fontSize:16}}>ルーム名</Text>
        <TextInput
          style={{
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: "#ACACAC",
            height: 38,
            width: "90%",
            marginLeft: "5%",
            paddingLeft: '2%',
            marginTop: "3%",
            borderRadius: 5,
          }}
          placeholder="ルーム名を入力してください"
          onChangeText={(text) => setRoom(text)}
        />
        <Text style={{marginTop:'3%', paddingLeft: '7%',fontSize: 16}}>ふたりの合言葉</Text>
        <TextInput
          placeholder="ふたりの合言葉を入力してください"
          onChangeText={(text) => setPass(text)}
          secureTextEntry
          style={{
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: "#ACACAC",
            height: 38,
            width: "90%",
            marginLeft: "5%",
            marginTop: "5%",
            paddingLeft: '2%',
            borderRadius: 5,
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#FFAA36",
            width: "90%",
            height: 47,
            borderRadius: 5,
            borderWidth: 0,
            overflow: "hidden",
            marginLeft: "5%",
            marginTop: "10%",
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
    </KeyboardAvoidingView>
  );
};
export default RoomLogin;
