import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, View, ToastAndroid } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Appbar, Button, Headline, TextInput, Title } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";
import { useSelector } from "react-redux";
import { DrawerActions } from "@react-navigation/native";

const Settings = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState("");
  const [uploading, setUploading] = useState("");
  const [transferred, setTransferred] = useState("");
  const [fullname, setFullname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [mobileMoney, setMobileMoney] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const profile = useSelector((state) => state.app.profileState.userData);

  useEffect(() => {
    setFullname(profile.fullname);
    setCompanyName(profile.companyName);
    setAddress(profile.address);
    setPhoneNo(profile.phoneNo);
    setBank(profile.bank);
    setAccount(profile.setAccount);
    setMobileMoney(profile.mobileMoney);
    setEmail(profile.email);

    setImageUrl(profile.logo);
  }, []);

  let pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImage(pickerResult);
    setImageUrl(pickerResult.uri);
  };

  const validateFields = (values) => {
    let errors = {};
    if (!values.fullname) {
      errors.fullname = "Fullname is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.companyName) {
      errors.companyName = "Company name is required";
    }
    if (!values.address) {
      errors.address = "Address is required";
    }
    if (!values.phoneNo) {
      errors.phoneNo = "Phone number is required";
    }

    return errors;
  };

  const uploadImage = async (image) => {
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(`/logo${auth().currentUser.uid}`)
      .putFile(image.uri);
    // set progress state
    task.on("state_changed", (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      let result = await task;
      const url = await storage()
        .ref(`/logo${auth().currentUser.uid}`)
        .getDownloadURL();
      console.warn(url);
      setImageUrl(url);
    } catch (e) {
      console.error(e);
    }
    setUploading(false);

    setImage(null);
  };

  const handleSubmit = () => {
    const values = { fullname, companyName, address, phoneNo, email };
    let errors = validateFields(values);
    console.log(errors);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      const user = auth().currentUser;
      if (user !== null) {
        uploadImage(image);
      }
      database()
        .ref(`/users/${user.uid}/userProfile`)
        .update({
          fullname,
          companyName,
          address,
          phoneNo,
          email,
          mobileMoney,
          bank,
          account,
          logo: imageUrl,
        })
        .then(() => {
          setLoading(false);

          ToastAndroid.show("Update complete!", ToastAndroid.LONG);
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
        <Appbar.Action
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          icon="menu"
        />
        <Appbar.Content
          title="Settiings"
          subtitle="Update your Corporate Profile"
        />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <RectButton
          onPress={pickImage}
          style={{
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#fff",
            paddingVertical: 10,
            marginTop: 10,
            paddingLeft: 20,
          }}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
          ) : (
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                backgroundColor: "#f2f2f2",
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign size={28} color="#047EE4" name="camera" />
            </View>
          )}

          <Text>Add Company Logo</Text>
        </RectButton>
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
            PERSONAL DETAILS
          </Text>
          <TextInput
            error={true}
            label="Email"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            error={hasError("email")}
          />
        </View>

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
            COMPANY DETAILS
          </Text>
          <TextInput
            label="Fullname"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={fullname}
            onChangeText={(text) => setFullname(text)}
            error={hasError("fullname")}
          />
          <TextInput
            label="Company Name"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={companyName}
            onChangeText={(text) => setCompanyName(text)}
            error={hasError("companyName")}
          />
          <TextInput
            label="Address"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={address}
            onChangeText={(text) => setAddress(text)}
            error={hasError("address")}
          />
          <TextInput
            label="Phone Number"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
            error={hasError("phoneNo")}
          />
        </View>

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
            PAYMENT DETAILS
          </Text>
          <TextInput
            label="Bank"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={bank}
            onChangeText={(text) => setBank(text)}
          />
          <TextInput
            label="Account Number"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={account}
            onChangeText={(text) => setAccount(text)}
          />
          <TextInput
            label="Mobile Money Number"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={mobileMoney}
            onChangeText={(text) => setMobileMoney(text)}
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
            Update Profile
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
