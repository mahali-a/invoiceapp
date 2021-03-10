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
import { Button, Title, Appbar } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Clients = ({ navigation }) => {
  const clientList = useSelector((state) => state.app.clients.data);

  const [clients, setClients] = useState(clientList);

  const [filteredClients, setFilteredClients] = useState(clientList);
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e) => {
    setSearchTerm(e);
    let results = clients.filter((item) => {
      if (item.name.toLowerCase().includes(e.toLowerCase())) return item;
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
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Appbar.Content title="Clients" />
      </Appbar.Header>
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
                onPress={() => navigation.navigate("AddClient")}
              >
                Add Client
              </Button>
            </View>
          </View>
        )}
        data={clientList}
        ItemSeparatorComponent={() => renderSeparatorView()}
        renderItem={({ item }) => (
          <RectButton
            onPress={() => navigation.navigate("AddNewClient", { item })}
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
              bgColors={["#ccc", "#717171", "#ccaabb"]}
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
    </View>
  );
};

export default Clients;
