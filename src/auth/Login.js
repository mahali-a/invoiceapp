import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Appbar, Button, Headline, TextInput, Title } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const validateFields = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = () => {
    const values = { password, email };
    let errors = validateFields(values);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate("Invoice");
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    }
  };

  const hasError = (name) => {
    let error = errors.hasOwnProperty(name);
    if (error) {
      return true;
    } else return false;
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Sign In" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            padding: "5%",
            paddingBottom: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{ fontWeight: "bold", color: "#047EE4", marginBottom: 10 }}
          >
            LOGIN DETAILS
          </Text>
          <TextInput
            error={true}
            label="Email"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            error={hasError("email")}
          />
          <TextInput
            label="Password"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            error={hasError("password")}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            paddingBottom: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            loading={loading}
            disabled={loading}
            uppercase={false}
            style={{
              width: "80%",
              borderRadius: 5,
              textTransform: "capitalize",
            }}
            mode="contained"
            onPress={() => handleSubmit()}
          >
            Login
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
