import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { KeyboardAvoidingView, Text, View } from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase";

const MailAddress = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscrive = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Login");
      }
    });
    return unsubscrive;
    // onAuthStateChangedはユーザーの登録情報が変更がされたときに実行される。オブザーバーという
  }, []);
  const handleLogin = () => {
    console.log("hoge");
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log("登録されました");
        console.log(userCredential);
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  };
  const handleSineUp = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <KeyboardAvoidingView>
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="パスワード"
            value={pass}
            onChangeText={(text) => setPass(text)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleLogin}>
            <Text>ログイン</Text>
          </TouchableOpacity>
          <Text>yattokを初めてのご利用の方はこちら</Text>
          <TouchableOpacity>
            <Text onPress={handleSineUp}>新規登録</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default MailAddress;
