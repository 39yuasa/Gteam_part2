import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { ref, get, child, set } from "firebase/database";
import { useState } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import db from "../firebase";

const RoomCreate = () => {
  const navigation = useNavigation();
  const [room, setRoom] = useState("");
  const [pass, setPass] = useState("");
  const handleSignUp = () => {
    set(ref(db, `room/${room}`), {
      name: room,
      pass: pass,
      home: "",
      task: [
        {
          key: "料理を作る",
          bool: false,
          check: false,
        },
        {
          key: "洗濯物をたたむ",
          bool: false,
          check: false,
        },
        {
          key: "お風呂を洗う",
          bool: false,
          check: false,
        },
        {
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
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={{minHeight: '40%', paddingTop: '30%'}}>
      <Text style={{color: '#FFAA36',fontWeight: 'bold',fontSize: 40,textAlign: 'center'}}>ふたりのこと</Text>
      <Text style={{color: '#FFAA36',fontWeight: 'bold',fontSize: 40,textAlign: 'center'}}>教えてください</Text>
      </View>
      <View>
      <Text style={{paddingLeft: '7%', fontSize: 16}}>ルーム名</Text>
        <TextInput style={{
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: "#ACACAC",
            height: 38,
            width: "90%",
            marginLeft: "5%",
            marginTop: "3%",
            paddingLeft: '2%',
            borderRadius: 5,
          }} placeholder="ルーム名を入力してください" onChangeText={(text) => setRoom(text)} />
          <Text style={{marginTop:'3%', paddingLeft: '7%', fontSize: 16}}>ふたりの合言葉</Text>
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
        <Text style={{marginTop:'3%', paddingLeft: '7%', fontSize: 16}}>住所</Text>
        <TextInput
          placeholder="(例) 東京都新宿区百人町1-10-100"
          onChangeText={(text) => set(text)}
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
        <Text style={{fontSize: 12, color: '#FAB659', paddingTop: '2%', paddingLeft: '7%'}}>※帰宅時間を割り出すときにのみ利用されます。</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleSignUp} style={{
            backgroundColor: "#FFAA36",
            width: "90%",
            height: 47,
            borderRadius: 5,
            borderWidth: 0,
            overflow: "hidden",
            marginLeft: "5%",
            marginTop: "10%",
          }}>
          <Text　style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: "4%",
            }}>次へ</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RoomCreate;
