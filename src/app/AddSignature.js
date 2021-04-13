import React, { useRef } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Appbar } from "react-native-paper";
import SignatureScreen from "react-native-signature-canvas";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Sign = ({ onOk, navigation }) => {
  const ref = useRef();

  const handleSignature = (signature) => {
    uploadImage(signature);
  };

  const uploadImage = async (value) => {
    try {
      await AsyncStorage.setItem("signature", value);
      navigation.navigate("Settings");
    } catch (e) {
      console.log(e);
      // saving error
    }
  };
  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    console.log("end");
    ref.current.readSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.pop();
          }}
        />
        <Appbar.Content title="Add Signature" />
      </Appbar.Header>
      <Text
        style={{
          //   fontWeight: "bold",
          color: "#999",
          paddingLeft: 20,
          marginBottom: 10,
          paddingVertical: 20,
          fontSize: 20,
        }}
      >
        Please sign below
      </Text>
      <View
        style={{
          width: "100%",
          height: 300,
          borderWidth: 5,
          borderColor: "#ddd",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <SignatureScreen ref={ref} onOK={handleSignature} webStyle={style} />
      </View>

      <View style={styles.row}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // // borderWidth: 12,
    // padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
