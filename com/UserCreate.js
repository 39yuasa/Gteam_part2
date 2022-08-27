import { child, get, ref, set } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import db from "../firebase";
// フォアグラウンド（アプリが立ち上がっている）のときの通知の受け取り方
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 通知
    shouldPlaySound: false, // 音
    shouldSetBadge: false, // アプリの通知数が携帯のホーム上に反映されるかどうか
  }),
});
const UserCreate = (data) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      // registerForPushNotificationsAsync発火
      setExpoPushToken(token)
    );
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const { room, user } = data.route.params;
  const [userName, setUserName] = useState("");
  const [userColor, setUserColor] = useState("#D64949");
  const navigation = useNavigation();
  const handleUser = () => {
    set(ref(db, `room/${room}/${user}`), {
      name: userName,
      color: userColor,
      id: expoPushToken,
      //ここにexpoidとcolor入る予定
    });
    navigation.navigate("Home", { room: room, user: user });
  };
  const handleRed = () => {
    setUserColor("#D64949");
  };
  const handleOrange = () => {
    setUserColor("#F08233");
  };
  const handleYellow = () => {
    setUserColor("#FFE800");
  };
  const handleGreen = () => {
    setUserColor("#009245");
  };
  const handleBlue = () => {
    setUserColor("#135CD1");
  };
  const handlePurple = () => {
    setUserColor("#8142C1");
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
        <KeyboardAvoidingView behavior="padding">
          <View>
            <Text style={styles.yours1}>あなたのこと</Text>
            <Text style={styles.yours2}>教えてください</Text>
          </View>
          <View>
            <View>
              <Text style={styles.title1}>あなたの名前</Text>
            </View>
          </View>
          <TextInput
            placeholder="あなたの名前を入力してください"
            onChangeText={(text) => {
              setUserName(text);
            }}
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
          <View>
            <Text style={styles.title2}>あなたを表す色は？</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={handleRed}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor:
                    userColor == "#D64949" ? "#D64949" : "#DE6D6D",
                  borderWidth: userColor == "#D64949" ? 3 : 1,
                  borderColor: userColor == "#D64949" ? "#333333" : "#BCBCBC",
                  borderRadius: 999,
                }}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOrange}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor:
                    userColor == "#F08233" ? "#F08233" : "#F39B5C",
                  borderWidth: userColor == "#F08233" ? 3 : 1,
                  borderColor: userColor == "#F08233" ? "#333333" : "#BCBCBC",
                  borderRadius: 999,
                }}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleYellow}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor:
                    userColor == "#FFE800" ? "#FFE800" : "#FFEC33",
                  borderWidth: userColor == "#FFE800" ? 3 : 1,
                  borderColor: userColor == "#FFE800" ? "#333333" : "#BCBCBC",
                  borderRadius: 999,
                }}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGreen}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor:
                    userColor == "#009245" ? "#009245" : "#33A86A",
                  borderWidth: userColor == "#009245" ? 3 : 1,
                  borderColor: userColor == "#009245" ? "#333333" : "#BCBCBC",
                  borderRadius: 999,
                }}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBlue}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor:
                    userColor == "#135CD1" ? "#135CD1" : "#427DDA",
                  borderWidth: userColor == "#135CD1" ? 3 : 1,
                  borderColor: userColor == "#135CD1" ? "#333333" : "#BCBCBC",
                  borderRadius: 999,
                }}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePurple}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor:
                    userColor == "#8142C1" ? "#8142C1" : "#9A68CD",
                  borderWidth: userColor == "#8142C1" ? 3 : 1,
                  borderColor: userColor == "#8142C1" ? "#333333" : "#BCBCBC",
                  borderRadius: 999,
                }}
              ></View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleUser}
            style={{
              backgroundColor: "#FFAA36",
              width: "90%",
              height: 50,
              borderRadius: 8,
              marginLeft: "5%",
              marginTop: "13%",
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
              アプリを始める
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};
export default UserCreate;
async function registerForPushNotificationsAsync() {
  let token;
  try {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      //通知ができるかどうかの今現在の権限設定を調べる。
      //デフォルトではアラート、バッジカウントの設定、サウンドの再生が含まれている
      // console.log(existingStatus);
      // 許可されていたためgranted(true)が返ってきた。ようは許可はしているということだ
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        // もし権限の状態が許可が降りていなかったら処理が走る
        //ユーザーに許可をもらういに行く
        const { status } = await Notifications.requestPermissionsAsync();
        //ユーザーの答えによって値が変わる
        finalStatus = status;
      }
      // 上の処理の後の権限の状態の確認
      if (finalStatus !== "granted") {
        // ユーザー権限を拒否したときに処理が動く
        alert("通知機能が使えないよ");
        return;
        //許可は否定されたら、ユーザに知らせる
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //プッシュ通知用のトークンの取得
    } else {
      alert("Must use physical device for Push Notifications");
    }
    if (Platform.OS === "android") {
      //端末がandroidのとき処理が動く
      Notifications.setNotificationChannelAsync(
        "default", //第一引数(default)がチャンネル識別子)、第2引数（下のオブジェクトの中身）はチャンネルのタイプ
        {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
  console.log(token);
  return token;
}
const styles = StyleSheet.create({
  yours1: {
    color: "#FFAA36",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "30%",
  },
  yours2: {
    color: "#FFAA36",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30%",
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
