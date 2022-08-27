import { initializeApp } from "firebase/app";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import Slider from "./slider";
function LoginScreen() {
  const navigation = useNavigation();
  return (
    <>
      <View>
        {/* <View style={styles.bg}>
          <Text style={styles.white01}>Yattoku!</Text>
          <Text style={styles.white02}>はこんなアプリ</Text>
        </View> */}

        <View>
          <Slider />
        </View>

      </View>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RoomCreate");
          }}
          style={styles.btn}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "4%",
            }}
          >
            ルームを新規作成
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RoomLogin");
          }}
        >
          <Text
            style={{
              color: "#FFAA36",
              textAlign: "center",
              fontSize: 16,
              marginTop: "6%",
              fontWeight: "bold",
            }}
          >
            既存のルームに参加
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
export default LoginScreen;
const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#E4E4E4",
    minHeight: "75vh",
  },
  white01: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "55%",
    shadowColor: "black",
    shadowOffset: "width",
  },
  white02: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#FFAA36",
    width: "90%",
    height: 47,
    borderRadius: 5,
    borderWidth: 0,
    overflow: "hidden",
    marginTop: "14%",
    marginLeft: "5%",
  },
});
