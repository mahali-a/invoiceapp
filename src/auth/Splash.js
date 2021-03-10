import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setAppState, setClientState, setProfileState } from "../redux/actions";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import { CommonActions } from "@react-navigation/native";
import {
  SET_CLIENT_STATE,
  SET_INVOICE_STATE,
  SET_PROFILE_STATE,
  SET_ITEMS_STATE,
} from "../redux/types";

const Splash = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    database()
      .ref(`users/${auth().currentUser.uid}/userProfile/`)
      .on("value", (snapshot) => {
        return dispatch({
          type: SET_PROFILE_STATE,
          payload: { userData: snapshot.val() },
        });
      });

    database()
      .ref(`users/${auth().currentUser.uid}/invoices/`)
      .on("value", (snapshot) => {
        const invoices = [];
        snapshot.forEach((child) => {
          const invoice = child.val();
          invoices.push({
            id: child.key,
            ...invoice,
          });
        });

        return dispatch({
          type: SET_INVOICE_STATE,
          payload: { data: invoices },
        });
      });
    database()
      .ref(`users/${auth().currentUser.uid}/clients/`)
      .on("value", (snapshot) => {
        const fetchedClients = [];
        snapshot.forEach((child) => {
          const client = child.val();
          fetchedClients.push({
            id: child.key,
            ...client,
          });
        });

        return dispatch({
          type: SET_CLIENT_STATE,
          payload: { data: fetchedClients },
        });
      });

    database()
      .ref(`users/${auth().currentUser.uid}/items/`)
      .on("value", (snapshot) => {
        const fetchedItems = [];
        snapshot.forEach((child) => {
          const item = child.val();
          fetchedItems.push({
            id: child.key,
            ...item,
          });
        });

        return dispatch({
          type: SET_ITEMS_STATE,
          payload: { data: fetchedItems },
        });
      });

    navigation.dispatch(CommonActions.navigate({ name: "Invoice" }));
  }

  return (
    <View
      style={{
        backgroundColor: "#047EE4",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "#fff",
          fontWeight: "bold",
          letterSpacing: 1.2,
        }}
      >
        Invoice
      </Text>
      <Text style={{ fontSize: 18, color: "#fff", opacity: 0.7 }}>OnTheGo</Text>
    </View>
  );
};

export default Splash;
