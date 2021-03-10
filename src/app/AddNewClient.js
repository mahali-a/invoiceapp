import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Appbar, Button, Headline, TextInput, Title } from "react-native-paper";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setAppState } from "../redux/actions";
import { SET_APP_STATE } from "../redux/types";

const AddNewClient = ({ navigation, route }) => {
  const _goBack = () => navigation.goBack();

  useEffect(() => {
    let params = route.params;
    if (params !== undefined) {
      setId(params.item.id);
      setFullname(params.item.fullname);
      setCompany(params.item.company);
      setEmail(params.item.email);
      setPhoneNo(params.item.phoneNo);
      setAddress(params.item.address);
      setCity(params.item.city);
      setCountry(params.item.country);
    }
  }, []);

  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [fullname, setFullname] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFields = (values) => {
    let errors = {};
    if (!values.fullname) {
      errors.fullname = "Fullname is required";
    }

    if (!values.phoneNo) {
      errors.phoneNo = "Phone number is required";
    }

    return errors;
  };

  const handleSubmit = () => {
    const values = {
      fullname,
      company,
      address,
      phoneNo,
      email,
      address,
      city,
      country,
    };
    let errors = validateFields(values);

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      let user = auth().currentUser;
      let values = {
        fullname,
        company,
        address,
        phoneNo,
        email,
        city,
        country,
      };
      if (id === null) {
        database()
          .ref(`/users/${user.uid}/clients`)
          .push(values)
          .then(() => {
            dispatch({
              type: SET_APP_STATE,
              payload: { selectedClient: values },
            });

            navigation.navigate("AddInvoice");
          });
      } else {
        database()
          .ref(`/users/${user.uid}/clients/${id}`)
          .update(values)
          .then(() => {
            navigation.navigate("Clients");
          });
      }
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
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content
          title="Client"
          subtitle={id ? "Update client details" : "Add new client"}
        />
        {id && (
          <Appbar.Action
            icon="delete"
            onPress={() =>
              database()
                .ref(`/users/${auth().currentUser.uid}/clients/${id}`)
                .remove()
                .then(() => navigation.navigate("Clients"))
                .catch(() => alert(e))
            }
          />
        )}
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ flex: 1, backgroundColor: "#f2f2f2" }}
      >
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
            CLIENT DETAILS
          </Text>
          <TextInput
            label="Fullname"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={fullname}
            onChangeText={(text) => setFullname(text)}
            error={hasError("fullname")}
          />
          <TextInput
            label="Phone Number"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
            error={hasError("phoneNo")}
          />
          <TextInput
            label="Company Name"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={company}
            onChangeText={(text) => setCompany(text)}
            error={hasError("company")}
          />
          <TextInput
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
            ADDRESS DETAILS
          </Text>
          <TextInput
            label="Address"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={address}
            onChangeText={(text) => setAddress(text)}
            error={hasError("address")}
          />
          <TextInput
            label="City"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={city}
            onChangeText={(text) => setCity(text)}
            error={hasError("city")}
          />
          <TextInput
            label="Country"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={country}
            onChangeText={(text) => setCountry(text)}
            error={hasError("country")}
          />
        </View>
      </ScrollView>
      <View
        style={{
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "#fff",
          width: "100%",
          padding: 20,
        }}
      >
        <Button
          loading={loading}
          uppercase={false}
          style={{
            width: "100%",
            borderRadius: 5,
            textTransform: "capitalize",
          }}
          mode="contained"
          onPress={() => handleSubmit()}
        >
          {id ? "Update Details" : "Add Client"}
        </Button>
      </View>
    </View>
  );
};

export default AddNewClient;
