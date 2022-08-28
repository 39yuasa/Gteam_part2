import CheckList from "./checkList";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ref, onValue, set, get, child, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase";
const CheckScreen = (data) => {
  const { index, user } = data.route.params;
  const db = getDatabase(app);
  // idにはuserのexpoIdが入っている
  // nameにログインした人の名前が入っている
  const [task, setTask] = useState("");
  const [headName, setHeadName] = useState("");
  const [color, setColor] = useState("");
  const [home, setHome] = useState("");
  const [Id, setId] = useState("");
  const RoomData = ref(db);
  useEffect(() => {
    // console.log(task);
    get(child(RoomData, `room/${index}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const Data = snapshot.val();
        // console.log(Data.);
        setTask(Data.task);
        setHome(Data.home);
        setHeadName(Data.name);
      } else {
        // console.log("No data available");
      }
    });

    // get(child(RoomData, `room/${index == "user1" ? "user1" : "user2"}/`)).then(
    get(
      child(RoomData, `room/${index}/${user == "user1" ? "user2" : "user1"}/`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        const Data = snapshot.val();
        console.log(Data.id);
        setColor(Data.color);
        setId(Data.id);
      } else {
        console.log("No data available");
      }
    });
  }, []);
  // useEffect(() => {
  //   console.log(Id);
  //   console.log(color);
  // }, [Id]);
  const handleChange = (value) => {
    console.log(value);
    const judge = (data) => {
      data.bool = !data.bool;
      async function sendPushNotification(Id) {
        // console.log(Id);
        // ここに通知がきそう
        const message = {
          // 端末指定
          to: Id,
          sound: "default",
          title: "アプリ名",
          body: `${value.key}`,
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
      set(ref(db, `room/${index}/task/${num}/`), {
        key: data.key,
        bool: data.bool,
        check: data.check,
      });
    });
  };

  const handleAdd = () => {
    console.log("タスク追加の処理が動いたよ");
  };
  // firebaseが書き換わったときに動く処理
  const room = ref(db, `room/${index}/task`);
  onValue(room, (snapshot) => {
    if (snapshot.exists()) {
      const Data = snapshot.val();
    } else {
      console.log(error);
    }
  });
  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.textInput}>
          <Text style={styles.textcr}>ToDoリスト</Text>
        </View>
        <View style={styles.bgbox}>
        <FlatList
          data={task}
          renderItem={
            ({ item, index }) => (
              <View style={styles.textline}>
                <CheckList
                  // style={{ backgroundColor: "lightgray", height: 1 }}
                  name={item.key}
                  option={item.bool}
                  color={color}
                  handle={() => handleChange(item, index)}
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
          <TouchableOpacity style={{backgroundColor: '#FFAA36',width: '100%',height: '50%',marginTop: '15%',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
            <Text style={styles.iconspulus}> ＋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addition}>
            <Text style={styles.textaddition}>ToDoリストに追加</Text>
          </TouchableOpacity>
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
            onPress={() => alert("(仮)帰宅時間をスタートします")}
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
    textAlign: 'center',
            alignItems: "center",
    fontSize: 40,
    fontWeight: 'bold'
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
