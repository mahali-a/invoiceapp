import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserAvatar from "react-native-user-avatar";
import { onChange } from "react-native-reanimated";
import { Button, FAB, Title } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { setAppState } from "../redux/actions";
import database from "@react-native-firebase/database";
import { SET_APP_STATE } from "../redux/types";

const ClientList = ({ navigation }) => {
  const dispatch = useDispatch();

  const clientList = useSelector((state) => state.app.clients.data);

  const [clients, setClients] = useState(clientList);
  const [filteredClients, setFilteredClients] = useState(clientList);
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e) => {
    setSearchTerm(e);
    let results = clients.filter((item) => {
      if (item.fullname.toLowerCase().includes(e.toLowerCase())) return item;
    });
    setFilteredClients(results);
  };

  const renderSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",

          backgroundColor: "#ddd",
        }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#047EE4",
          padding: "3%",
          marginBottom: 20,
          //   alignItems: "center",
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            overflow: "hidden",
            borderRadius: 100,
            marginBottom: 10,
          }}
        >
          <RectButton
            onPress={() => navigation.pop()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back-outline" color="#fff" size={24} />
          </RectButton>
        </View>

        <View>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Invoice To
          </Text>
          <TextInput
            value={searchTerm}
            onChangeText={(e) => onChange(e)}
            style={{
              borderBottomColor: "rgba(255,255,255,0.5)",
              borderBottomWidth: 1,
              color: "#fff",
            }}
            placeholderTextColor="rgba(255,255,255,0.7)"
            placeholder="Client Name"
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={{}}
        ListEmptyComponent={() => (
          <View
            style={{
              height: Dimensions.get("window").height - 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/invoice.png")}
              style={{ marginTop: 30 }}
            />
            <Title style={{ fontWeight: "bold" }}>No results found</Title>
            <Text
              style={{
                paddingHorizontal: 20,
                marginTop: 5,
                textAlign: "center",
              }}
            >
              We can't find any items matching your search
            </Text>

            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                uppercase={false}
                style={{
                  width: "80%",
                  borderRadius: 5,
                  textTransform: "capitalize",
                }}
                mode="contained"
                onPress={() => navigation.navigate("AddNewClient")}
              >
                Add Client
              </Button>
            </View>
          </View>
        )}
        data={filteredClients}
        ItemSeparatorComponent={() => renderSeparatorView()}
        renderItem={({ item }) => (
          <RectButton
            onPress={() => {
              dispatch({
                type: SET_APP_STATE,
                payload: { selectedClient: item },
              });
              navigation.navigate("AddInvoice");
            }}
            style={{
              padding: "3%",
              paddingHorizontal: "5%",
              borderBottomWidth: 1,
              borderBottomColor: "#f2f2f2",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UserAvatar
              size={50}
              name={item.fullname}
              bgColors={["#ccc", "#7834ae", "#ccaabb"]}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "#2d2d2d" }}
              >
                {item.fullname}
              </Text>
              <Text>{item.phoneNo}</Text>
            </View>
          </RectButton>
        )}
      />
      <View
        style={{
          position: "absolute",

          left: 0,
          right: 0,
          bottom: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FAB
          style={{
            backgroundColor: "#047EE4",
          }}
          large
          icon="plus"
          onPress={() => navigation.navigate({ name: "AddNewClient" })}
        />
      </View>
    </View>
  );
};

export default ClientList;
