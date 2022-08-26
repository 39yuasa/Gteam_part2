import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import iphone_8___se_____14 from "../assets/iphone_8___se_____14.png";
import hello from "../assets/hello.png";

const HomeScreen = (data) => {
  const navigation = useNavigation();
  const { room, user } = data.route.params;
  console.log(room, user);
  const handleReturn = () => {
    navigation.navigate("User", {
      index: room,
      user: user,
    });
  };
  return (
    <View>
      <ImageBackground
        source={require("../assets/iphone_8___se_____14.png")}
        resizeMode="cover"
        style={styles.Images}
      >
        {/* <Image
          source={hello}
          alt="猫"
          style={{ width: "80%", marginLeft: "10%", marginTop: 180, zIndex: 1 }}
        /> */}
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
  Images: {
    height: "100vh",
    width: "100%",
  },
});
