import React from "react";
import { View, Text, Image } from "react-native";
import { Headline, Button, Title } from "react-native-paper";

const GetStarted = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/images/invoice.png")}
        style={{ marginTop: 30 }}
      />
      <Title style={{ fontWeight: "bold" }}>Create Invoice on the go!</Title>
      <Text
        style={{ paddingHorizontal: 20, marginTop: 10, textAlign: "center" }}
      >
        Quick and easy way to create your invoice on the fly and share with your
        clients instantly.
      </Text>

      <View
        style={{
          position: "absolute",
          bottom: 40,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          uppercase={false}
          style={{ width: "80%", borderRadius: 5, textTransform: "capitalize" }}
          mode="contained"
          onPress={() => navigation.navigate("Signup")}
        >
          Get Started
        </Button>

        <Button
          uppercase={false}
          style={{
            width: "80%",
            marginTop: 20,
            borderRadius: 5,
            textTransform: "capitalize",
          }}
          mode="outlined"
          onPress={() => navigation.navigate("Login")}
        >
          LogIn
        </Button>
      </View>
    </View>
  );
};

export default GetStarted;
