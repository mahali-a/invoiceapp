import * as React from "react";
import { Image, Dimensions, Text, View } from "react-native";
import { FlatList, RectButton } from "react-native-gesture-handler";
import { CommonActions, DrawerActions } from "@react-navigation/native";
import dateFormat from "dateformat";

import { Appbar, FAB, Title } from "react-native-paper";
import { getCurrency } from "../util";
import { useSelector, useDispatch } from "react-redux";
import { SET_APP_STATE } from "../redux/types";

const Invoice = ({ navigation }) => {
  const dispatch = useDispatch();
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

  const getTotal = (items) => {
    return items.reduce((sum, i) => {
      return sum + i.price * i.quantity;
    }, 0);
  };

  const invoices = useSelector((state) => state.app.invoices.data);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Appbar.Header>
        <Appbar.Action
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          icon="menu"
        />

        <Appbar.Content title="Invoice" />
        <Appbar.Action icon="magnify" />
      </Appbar.Header>

      <FlatList
        data={[...invoices]}
        ItemSeparatorComponent={() => renderSeparatorView()}
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
            <Title style={{ fontWeight: "bold" }}>You have no invoice</Title>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: "center",
              }}
            >
              Create your first invoice now!
            </Text>

            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            ></View>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <RectButton
              onPress={() => {
                dispatch({
                  type: SET_APP_STATE,
                  payload: {
                    selectedClient: item.client,
                    currentItems: item.items,
                  },
                });

                navigation.navigate("AddInvoice", {
                  item,
                });
              }}
              style={{
                padding: "3%",
                paddingHorizontal: "5%",
                borderBottomWidth: 1,
                borderBottomColor: "#f2f2f2",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, color: "#2d2d2d" }}
                >
                  {item.client.fullname}
                </Text>
                <Text>
                  Invoice #{item.invoiceNo} |{" "}
                  {dateFormat(item.dueDate, "paddedShortDate")}
                </Text>
                <Text>{item.address}</Text>
              </View>
              <View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "#2d2d2d" }}
                >
                  {getCurrency(getTotal(item.items))}
                </Text>
              </View>
            </RectButton>
          );
        }}
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
          onPress={() =>
            navigation.dispatch(CommonActions.navigate({ name: "AddInvoice" }))
          }
        />
      </View>
    </View>
  );
};

export default Invoice;
