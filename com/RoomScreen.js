import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import db from "../firebase";
const RoomScreen = (data) => {
  const navigation = useNavigation();
  const { room } = data.route.params;
  const RoomData = ref(db);
  const [name, setName] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  //   新規作成の流れを変える
  useEffect(() => {
    get(child(RoomData, `room/${room}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const Data = snapshot.val();
        setName(Data.name);
        setUser1(Data.user1);
        setUser2(Data.user2);
      }
    });
  }, []);
  const userHandleChange = (user, index) => {
    if (user.name == "") {
      // console.log("ユーザーを新規登録します");
      navigation.navigate("UserCreate", {
        room: room,
        user: index,
      });
      // navigateでindex番号を渡す
      //user1なのかuser2どちらが押されたかの情報をnavigateで渡す必要がある
      // →これは引数でわたせばいけそう
    } else {
      navigation.navigate("Home", {
        room: room,
        user: user,
      });
    }
  };
  return (
    <>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "100%",
        }}
      >
        {/* <View>
          <Text>{name}さんのお家です</Text>
        </View> */}
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => userHandleChange(user1, "user1")}
            style={{
              backgroundColor: "#FFAA36",
              width: 253,
              height: 253,
              borderRadius: 8,
              marginTop: "8%",
              marginBottom: "4%",
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
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "#FFFFFF",
                paddingTop: 114,
                // marginTop: "45%",
              }}
            >
              {user1.name == ""
                ? "ユーザーを新規作成"
                : `${user1.name} でログイン`}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => userHandleChange(user2, "user2")}
            style={{
              backgroundColor: "#FFAA36",
              width: 253,
              height: 253,
              borderRadius: 8,
              marginTop: "4%",
              marginBottom: "8%",
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
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "#FFFFFF",
                paddingTop: 114,
                // marginTop: "45%",
              }}
            >
              {user2.name == ""
                ? "ユーザーを新規作成"
                : `${user2.name} でログイン`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default RoomScreen;
