import CheckList from "./checkList";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { ref, onValue, set, get, child, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase";
import MapViewDirections from "react-native-maps-directions";
import { useLinkProps, useNavigation } from "@react-navigation/native";
const CheckScreen = (data) => {
  const navigation = useNavigation();
  const { index, user, address } = data.route.params;
  // indexにルーム名、userにuser1でろぐいんしているかuser2でログインしているかがわかる、addressに現在地の緯度経度がオブジェクトが入っている
  // addressには現在位置
  const db = getDatabase(app);
  // idにはuserのexpoIdが入っている
  // nameにログインした人の名前が入っている
  const [task, setTask] = useState(""); // タスクのstate
  const [color, setColor] = useState(""); //user1のcolorのstate
  const [color2, setColor2] = useState("空"); //user2のcolorのstate
  const [home, setHome] = useState(""); //家の緯度経度が入っているstate
  const [Id, setId] = useState(""); //通知を送る相手のidが入っているstate
  const [myId, setMyId] = useState("空"); //自分のexpoId
  const [returnTime, setReturnTime] = useState(""); //帰宅にかかる時間
  const [userName, setUserName] = useState("空"); //ログインしているユーザの名前
  const [userName2, setUserName2] = useState(""); //ログインしていない方のユーザの名前
  const [Hour, setHour] = useState(0); //現在時刻の時が含まれているstate
  const [Minutes, setMinutes] = useState(0); //現在時刻の分が含まれているstate
  const [timer, setTimer] = useState(""); //自分の家につく時間が入っている
  const [timer2, setTimer2] = useState(""); //相手の家につく時間が入っている
  const RoomData = ref(db);

  useEffect(() => {
    get(child(RoomData, `room/${index}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const Data = snapshot.val();
        setTask(Data.task);
        setHome(Data.home);
      } else {
        // console.log("No data available");
      }
    });

    get(
      child(RoomData, `room/${index}/${user == "user1" ? "user2" : "user1"}/`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        const Data = snapshot.val();
        setColor(Data.color);
        setId(Data.id);
        setUserName2(Data.name);
        setTimer2(Data.time);
      } else {
        // console.log("No data available");
      }
    });
    get(
      child(RoomData, `room/${index}/${user == "user1" ? "user1" : "user2"}/`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        const Data = snapshot.val();
        setColor2(Data.color);
        setUserName(Data.name);
        setMyId(Data.id);
      } else {
        // console.log("No data available");
      }
    });
  }, []);
  const [coordinates, setCoordinates] = useState("");
  useEffect(() => {
    setCoordinates([address, home]);
  }, [home]);

  const handleChange = (value) => {
    const judge = (data) => {
      data.bool = !data.bool;
      data.user = user;
      async function sendPushNotification(Id) {
        const message = {
          // 端末指定
          to: Id,
          sound: "default",
          title: "Yattoku!",
          body: `${value.key}をやっとくよ`,
          data: { someData: "goes here" },
        };
        try {
          await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Accept-encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
          });
        } catch (error) {
          // console.log(error);
        }
      }
      data.bool == true ? sendPushNotification(Id) : null;
      // sendPushNotification(Id);
      return data;
      // ここでfirebaseかき変えてしまえばよさそう、書き換えてしまえばよさそう、ただ全体がき変わるような処理になるから大変そう
      // 書き換えられたときにroomの情報をとってきて、変更したときに動く関数でstateの値を書き換える
    };
    const array2 = task.map((data) => {
      return data.key == value.key ? judge(data) : data;
    });
    setTask(array2);
    // valueの中には押された要素の内容が入っているからそれと内容のあうものをfirebaseから取ってきて書き換える処理をしてあげるのがベスト
    // arrayの値をfirebaseに入れ込む
    task.map((data, num) => {
      // console.log(user);
      set(ref(db, `room/${index}/task/${num}/`), {
        key: data.key,
        bool: data.bool,
        check: data.check,
        user: data.user,
      });
    });
  };
  const handleAdd = () => {
    // console.log("タスク追加の処理が動いたよ");
  };

  // firebaseが書き換わったときに動く処理
  // const room = ref(db, `room/${index}/${user}/`);
  // onValue(room, (snapshot) => {
  //   if (snapshot.exists()) {
  //     const Data = snapshot.val();
  //     console.log(Data.time, timer);
  //     // Data.time == timer ? console.log("変更はなしです") : setTimer(Data.time);
  //   } else {
  //     console.log(error);
  //   }
  // });
  useEffect(() => {
    const hour = new Date().getHours();
    setHour(hour);
    const minutes = new Date().getMinutes();
    setMinutes(minutes);
    // console.log(`${timer}時${hour}分です`);
    const time = Minutes + returnTime;
    // console.log(time);
    time > 60
      ? setTimer(`${Hour + 1}:${time - 60}`)
      : setTimer(`${Hour}:${time}`);
  }, [returnTime]);

  const handleGo = () => {
    navigation.navigate("Home", {
      index: index,
      user: user,
    });
  };

  const handleThank = () => {
    async function sendPushNotification(Id) {
      // console.log(Id);
      // ここに通知がきそう
      const message = {
        // 端末指定
        to: Id,
        sound: "default",
        title: "アプリ名",
        body: `ありがとう`,
        data: { someData: "goes here" },
      };
      try {
        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      } catch (error) {
        // console.log(error);
      }
    }
    sendPushNotification(Id);
  };

  useEffect(() => {
    timer == ""
      ? null
      : set(ref(db, `room/${index}/${user}/`), {
          time: timer,
          name: userName,
          id: myId,
          color: color2,
        });
  }, [timer]);
  const GOOGLE_API_KEY = "AIzaSyDmiqSHNcm6aqEZfNW_TtyS360_DxsPQWg";
  const one = require("../assets/one.png");
  const oneImage = Image.resolveAssetSource(one);
  return (
    <>
      {/* ここが時間のところ */}
      <Text>
        {userName}帰宅予定時刻{timer}
      </Text>
      <Text>
        {userName2}帰宅予定時刻{timer2}
      </Text>
      <View style={styles.wrap}>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_API_KEY} // insert your API Key here
          strokeWidth={4}
          mode="DRIVING"
          strokeColor="#111111"
          onReady={(result) => {
            // console.log(`Distance: ${result.distance} km`);
            // console.log(`Duration: ${result.duration} min.`);
            setReturnTime(Math.floor(result.duration));
          }}
        />
        {/* ここに写真お願い */}
        <TouchableOpacity onPress={handleGo}>
          <View>
            <Image source={{ uri: oneImage.uri }} />
            <Text>Home</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.textInput}>
          <Text style={styles.textcr}>ToDoリスト</Text>
        </View>
        <View style={styles.bgbox}>
          <FlatList
            data={task}
            renderItem={
              ({ item, num }) => (
                <View style={styles.textline}>
                  <CheckList
                    // style={{ backgroundColor: "lightgray", height: 1 }}
                    name={item.key}
                    option={item.bool}
                    color={item.user == user ? color2 : color}
                    handle={() => handleChange(item, num)}
                    check={item.check}
                    textBox={
                      item.check == true ? item.text : console.log("falseです")
                    }
                  />
                </View>
              )
              //もう一個をfalseかtrueであげて、checklistのほうでpropsのbooleanによって書かれるか書かれないかの処理で良さそう
            }
          />
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={handleAdd}
              style={{
                backgroundColor: "#FFAA36",
                width: "100%",
                height: "50%",
                marginTop: "15%",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <Text style={styles.iconspulus}> ＋</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </View> */}
        {/*  */}
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={handleThank}
            style={{
              backgroundColor: "#ACACAC",
              width: "42%",
              height: 47,
              borderRadius: 5,
              borderWidth: 0,
              overflow: "hidden",
              marginTop: 20,
              marginLeft: "6%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
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
              marginTop: 20,
              marginLeft: "3%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
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
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    color: `#0000ff`,
  },
  wrap: {
    backgroundColor: "#F2ECE4",
    height: "100%",
    width: "100%",
  },
  container: {
    color: `#0000ff`,
    color: `#F2ECE4`,
  },
  textInput: {
    backgroundColor: "black",
    width: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    marginLeft: "5%",
    marginTop: "10%",
  },
  textcr: {
    color: "white",
    textAlign: "center",
  },
  addition: {
    marginLeft: 5,
  },
  textaddition: {
    fontSize: 16,
  },
  bgbox: {
    backgroundColor: "white",
    width: "90%",
    height: "70%",
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    marginLeft: "5%",
    marginRight: "5%",
    // overflow: auto,
  },
  chtext: {
    flexDirection: "row",
  },
  iconspulus: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textline: {
    width: "100%",
    height: 80,
    borderColor: "#E4E4E4",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderStyle: "dashed",
  },
});
export default CheckScreen;
