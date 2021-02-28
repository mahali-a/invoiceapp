import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  TextInput as RNTextInput,
} from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import {
  Appbar,
  Button,
  Headline,
  HelperText,
  TextInput,
  Title,
} from "react-native-paper";

import Entypo from "react-native-vector-icons/Entypo";
import { DatePickerModal } from "react-native-paper-dates";
import dateFormat from "dateformat";
import { getCurrency } from "../util";
import { useSelector, useDispatch } from "react-redux";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { Modalize } from "react-native-modalize";
import Icon from "./Icons";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { createHTML2, createHTML1, createHTML3 } from "../helpers/utils";
import { SET_APP_STATE } from "../redux/types";
import { createAndSavePDF } from "../util/index";

const AddInvoice = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const app = useSelector((state) => state.app.appState);
  const profile = useSelector((state) => state.app.profileState.userData);

  const invoiceModal = useRef();
  const [filePath, setFilePath] = useState("");
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  // const [items, setItems] = useState([]);

  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceTo, setinvoiceTo] = useState("");
  const [id, setId] = useState(null);
  const [total, setTotal] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [tax, setTax] = useState("");
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const isPermitted = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs access to Storage data",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert("Write permission err", err);
        return false;
      }
    } else {
      return true;
    }
  };

  const showOptions = () => {
    const values = {
      invoiceNo: invoiceNo,
      dueDate: date,
      client: app.selectedClient,
      items: app.currentItems,
    };
    let errors = validate(values);

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      onOpen();
    }
  };

  const createPDF = async () => {
    if (await isPermitted()) {
      let func;

      if (app.template == 1) {
        func = createHTML1;
      } else if (app.template == 2) {
        func = createHTML2;
      } else {
        func = createHTML3;
      }
      let options = {
        //Content to print
        html: await func({
          businessName: profile.companyName,
          email: profile.email,
          profile,
          client: app.selectedClient,
          invoiceNumber: invoiceNo,
          invoiceDate: date,
          items: app.currentItems,
          subtotal: subtotal,
          tax: tax,
          total: total,
          notes: notes,
        }),
        //File Name
        fileName: `${invoiceNo}`,
        //File directory
        directory: "docs",
      };
      let file = await RNHTMLtoPDF.convert(options);

      setFilePath(file.filePath);
      navigation.navigate("ViewPdf", { item: file.filePath });
    }
  };

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onChange = useCallback(({ date }) => {
    setDate(date);
    setVisible(false);
  }, []);

  const onOpen = () => {
    invoiceModal.current?.open();
  };
  const onClose = () => {
    invoiceModal.current?.close();
  };

  useEffect(() => {
    const params = route.params;
    if (params !== undefined) {
      setId(params.item.id);
      let item = params.item;

      setInvoiceNo(item.invoiceNo);
      setDate(item.dueDate);
      setNotes(item.notes);
      onOpen();
    }
  }, []);

  useEffect(() => {
    let subtotal = app.currentItems.reduce((sum, i) => {
      return sum + i.price * i.quantity;
    }, 0);
    let _tax = (tax / 100) * subtotal;
    let _discount = (discount / 100) * subtotal;
    let total = subtotal + _tax - _discount;
    setSubtotal(subtotal);
    setTotal(total);
  }, [app.currentItems, discount, tax]);

  const validate = (values) => {
    const errors = {};

    if (!values.invoiceNo) {
      errors.invoiceNo = "Field is required";
    }

    if (!values.client) {
      errors.client = "Please choose client";
    }

    if (values.items.length === 0) {
      errors.items = "Please add items";
    }

    return errors;
  };

  const handleCreateInvoice = () => {
    const values = {
      invoiceNo: invoiceNo,
      dueDate: date,
      client: app.selectedClient,
      items: app.currentItems,
      notes: notes,
    };

    let errors = validate(values);

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      let user = auth().currentUser;
      if (id === null) {
        database()
          .ref(`/users/${user.uid}/invoices/`)
          .push(values)
          .then(() => onOpen())
          .catch(() => alert(e));
      } else {
        database()
          .ref(`/users/${user.uid}/invoices/${id}`)
          .update(values)
          .then(() => onOpen())
          .catch(() => alert(e));
      }
    }
  };

  const createPdf = async () => {
    console.warn("creating PDF");

    let func;

    if (app.template == 1) {
      func = createHTML1;
    } else if (app.template == 2) {
      func = createHTML2;
    } else {
      func = createHTML3;
    }
    try {
      const html = await func({
        businessName: profile.companyName,
        email: profile.email,
        profile,
        client: app.selectedClient,
        invoiceNumber: invoiceNo,
        invoiceDate: date,
        items: app.currentItems,
        subtotal: subtotal,
        tax: tax,
        total: total,
        notes: notes,
      });
      if (html) {
        await createAndSavePDF(html);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong...");
    }
  };

  const resetState = () => {
    setFilePath("");

    setDate(new Date());

    // const [items, setItems([]);

    setInvoiceNo("");
    setinvoiceTo("");
    setId(null);
    setTotal("");
    setSubtotal("");
    setTax("");
    setDiscount("");
    setNotes("");
    setErrors({});
    dispatch({
      type: SET_APP_STATE,
      payload: {
        selectedClient: null,
        currentItems: [],
      },
    });
  };

  const renderContent = () => (
    <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10 }}>
      <RectButton
        onPress={() => onClose()}
        style={{ backgroundColor: "#fff", marginBottom: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            padding: 10,
            paddingHorizontal: "5%",
          }}
        >
          <Icon type="AntDesign" name="edit" color="#047EE4" />
          <Text style={{ marginLeft: 20, color: "#000", fontSize: 16 }}>
            Edit
          </Text>
        </View>
      </RectButton>

      <RectButton
        onPress={() => createPDF()}
        style={{ backgroundColor: "#fff", marginBottom: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            padding: 10,
            paddingHorizontal: "5%",
          }}
        >
          <Icon type="AntDesign" name="eyeo" color="#047EE4" />
          <Text style={{ marginLeft: 20, color: "#000", fontSize: 16 }}>
            View Invoice
          </Text>
        </View>
      </RectButton>
      <RectButton
        onPress={() => navigation.navigate("ChooseTemplate")}
        style={{ backgroundColor: "#fff", marginBottom: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            padding: 10,
            paddingHorizontal: "5%",
          }}
        >
          <Icon type="AntDesign" name="switcher" color="#047EE4" />
          <Text style={{ marginLeft: 20, color: "#000", fontSize: 16 }}>
            Change Template
          </Text>
        </View>
      </RectButton>
      <RectButton
        onPress={() => createPdf()}
        style={{ backgroundColor: "#fff", marginBottom: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            padding: 10,
            paddingHorizontal: "5%",
          }}
        >
          <Icon type="Entypo" name="share" color="#047EE4" />
          <Text style={{ marginLeft: 20, color: "#000", fontSize: 16 }}>
            Share PDF
          </Text>
        </View>
      </RectButton>
      <RectButton
        onPress={() => {
          let user = auth().currentUser;

          database()
            .ref(`/users/${user.uid}/invoices/${id}`)
            .remove()
            .then(() => navigation.pop())
            .catch(() => alert(e));
        }}
        style={{ backgroundColor: "#fff", marginBottom: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            padding: 10,
            paddingHorizontal: "5%",
          }}
        >
          <Icon type="AntDesign" name="delete" color="#e74c3c" />
          <Text style={{ marginLeft: 20, color: "#e74c3c", fontSize: 16 }}>
            Delete
          </Text>
        </View>
      </RectButton>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Modalize
        modalStyle={{ backgroundColor: "#f2f2f2" }}
        modalHeight={300}
        ref={invoiceModal}
      >
        {renderContent()}
      </Modalize>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            resetState();
            navigation.pop();
          }}
        />
        <Appbar.Content
          title={
            app.selectedClient?.fullname
              ? app.selectedClient?.fullname
              : "Add Invoice"
          }
        />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "46%", paddingTop: 9 }}>
              <TextInput
                label="Invoice No"
                keyboardType="number-pad"
                style={{ width: "100%", backgroundColor: "#fff" }}
                value={invoiceNo}
                onChangeText={(text) => setInvoiceNo(text)}
              />
              <HelperText style={{ color: "#e74c3c" }}>
                {errors?.invoiceNo}
              </HelperText>
            </View>

            <RectButton
              style={{ width: "46%" }}
              onPress={() => setVisible(true)}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#717171", paddingBottom: 3, fontSize: 12 }}
                >
                  Due Date
                </Text>
                <Text style={{ color: "#000", fontSize: 16, paddingBottom: 5 }}>
                  {dateFormat(date, "paddedShortDate")}
                </Text>
              </View>
            </RectButton>
          </View>

          <RectButton
            onPress={() => navigation.navigate("ClientList")}
            style={{ width: "100%", marginTop: 10 }}
          >
            <View
              style={{
                width: "100%",
                minHeight: 60,
                borderBottomWidth: 1,
                borderBottomColor: "#dddd",
                justifyContent: "flex-end",
                paddingLeft: 5,
                paddingBottom: app.selectedClient == null ? 20 : 5,
              }}
            >
              {app.selectedClient == null ? (
                <Text
                  style={{ color: "#717171", fontSize: 16, paddingLeft: 10 }}
                >
                  Invoice to
                </Text>
              ) : (
                <View>
                  <Text
                    style={{
                      color: "#2d2d2d",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {app.selectedClient.fullname}
                  </Text>
                  <Text style={{ color: "#717171", fontSize: 12 }}>
                    {app.selectedClient.email}
                  </Text>
                </View>
              )}
            </View>
          </RectButton>
          <HelperText style={{ color: "#e74c3c" }}>{errors?.client}</HelperText>
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
            INVOICE ITEMS
          </Text>
          {app.currentItems.length === 0 && <Text>You have 0 Items</Text>}
          {app.currentItems.map((item, index) => (
            <View
              key={index}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#000", fontSize: 16 }}>
                  {item.description}
                </Text>
                <Text style={{ color: "#000", fontSize: 16 }}>
                  {getCurrency(item.price * item.quantity)}
                </Text>
              </View>
              <Text style={{ fontSize: 14 }}>Qty: {item.quantity}</Text>
            </View>
          ))}

          <Button
            icon="plus"
            mode="contained"
            color="#f2f2f2"
            uppercase={false}
            labelStyle={{ color: "#047EE4" }}
            onPress={() => navigation.navigate("ItemList")}
            style={{ width: "40%", marginTop: 15 }}
          >
            Add Item
          </Button>
          <HelperText style={{ color: "#e74c3c" }}>{errors?.items}</HelperText>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            padding: "5%",
            paddingBottom: 5,
            marginTop: 20,
          }}
        >
          <Text
            style={{ fontWeight: "bold", color: "#047EE4", marginBottom: 10 }}
          >
            NOTES
          </Text>

          <TextInput
            multiline
            value={notes}
            placeholder="Please enter notes here"
            onChangeText={(text) => setNotes(text)}
            style={{ backgroundColor: "#fff" }}
          />

          <HelperText style={{ color: "#e74c3c" }}>{errors?.notes}</HelperText>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            paddingHorizontal: "5%",
            paddingBottom: 20,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#ddd",
              paddingVertical: 20,
            }}
          >
            <Text style={{ color: "#717171", fontSize: 16 }}>Subtotal</Text>
            <Text style={{ color: "#000", fontSize: 16 }}>
              {getCurrency(subtotal)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              alignItems: "center",
              borderColor: "#ddd",
              paddingVertical: 20,
            }}
          >
            <Text style={{ color: "#717171", fontSize: 16 }}>Discount</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RNTextInput
                keyboardType="number-pad"
                value={discount}
                onChangeText={(e) => setDiscount(e)}
                style={{ color: "#000", fontSize: 16 }}
              />
              <Text>%</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: "#ddd",
              paddingVertical: 20,
            }}
          >
            <Text style={{ color: "#717171", fontSize: 16 }}>Tax</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RNTextInput
                keyboardType="number-pad"
                value={tax}
                onChangeText={(e) => setTax(e)}
                style={{ color: "#000", fontSize: 16 }}
              />
              <Text>%</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#ddd",
              paddingVertical: 20,
            }}
          >
            <Text
              style={{ color: "#047EE4", fontSize: 20, fontWeight: "bold" }}
            >
              Grand Total
            </Text>
            <Text
              style={{ color: "#047EE4", fontSize: 16, fontWeight: "bold" }}
            >
              {getCurrency(total)}
            </Text>
          </View>
        </View>
      </ScrollView>
      <DatePickerModal
        mode="single"
        visible={visible}
        onDismiss={onDismiss}
        date={date}
        onConfirm={onChange}
        saveLabel="Save" // optional
        label="Select date" // optional
        animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        locale={"en"} // optional, default is automically detected by your system
      />
      <View
        style={{
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "#fff",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
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
          onPress={() => handleCreateInvoice()}
        >
          Create Invoice
        </Button>
        <View
          style={{
            width: 45,
            height: 45,
            backgroundColor: "rgba(4, 126, 228,0.1)",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <RectButton
            onPress={() => showOptions()}
            style={{
              width: 45,
              height: 45,
              backgroundColor: "rgba(4, 126, 228,0.1)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo name="dots-three-horizontal" color="#047EE4" size={24} />
          </RectButton>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  content__header: {
    padding: 15,
    paddingBottom: 0,

    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  content__heading: {
    marginBottom: 2,

    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__subheading: {
    marginBottom: 20,

    fontSize: 16,
    color: "#ccc",
  },

  content__inside: {
    padding: 15,
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  content__scrollview: {
    marginVertical: 20,
  },

  content__block: {
    width: 200,
    height: 80,

    marginRight: 20,

    backgroundColor: "#ccc",
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 10,

    width: "100%",

    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#cdcdcd",
    borderRadius: 6,
  },
});
export default AddInvoice;
