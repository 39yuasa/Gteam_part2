import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { CheckBox } from "react-native-elements";
const CheckList = (props) => {
  return (
    <View>
      <CheckBox
        checked={props.option}
        onPress={props.handle}
        title={props.name}
        checkedColor={props.color}
      />
      {/* <Text style={styles.container}>{props.name}</Text> */}
      {props.check &&
        (console.log(props.check),
        (
          <TextInput
            value={props.textBox}
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
              color: "#333333",
            }}
          ></TextInput>
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    color: `black`,
  },
});

export default CheckList;
