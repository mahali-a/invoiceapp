import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
  Appbar,
  Button,
  Headline,
  HelperText,
  TextInput,
  Title,
} from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DatePickerModal } from "react-native-paper-dates";
import dateFormat from "dateformat";
import { getCurrency } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from "../redux/actions";
import { SET_APP_STATE } from "../redux/types";

const AddItem = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [errors, setErrors] = useState({});

  const currentItems = useSelector((state) => state.app.appState.currentItems);

  useEffect(() => {
    let total =
      parseInt(price) * parseInt(quantity) -
      (parseInt(discount) + parseInt(tax));
    setTotal(parseInt(total));
  }, [price, quantity, discount, tax]);

  const validate = (values) => {
    let errors = {};
    if (!values.description) {
      errors.description = "Item description is required";
    }
    if (!values.price) {
      errors.price = "Price is required";
    }
    if (!values.quantity) {
      errors.quantity = "Quantity is required";
    }

    return errors;
  };

  const handleSubmit = () => {
    const values = { description, price, quantity, tax, discount };

    let errors = validate(values);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch({
        type: SET_APP_STATE,
        payload: { currentItems: [...currentItems, values] },
      });
      navigation.navigate("AddInvoice");
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
        <Appbar.Content title="Add Item" />
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              label="Item Description"
              style={{ width: "100%", backgroundColor: "#fff" }}
              value={description}
              onChangeText={(text) => setDescription(text)}
              error={hasError("description")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              label="Quantity"
              keyboardType="number-pad"
              style={{ width: "46%", backgroundColor: "#fff" }}
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              error={hasError("quantity")}
            />
            <TextInput
              label="Price"
              keyboardType="number-pad"
              style={{ width: "46%", backgroundColor: "#fff" }}
              value={price}
              onChangeText={(text) => setPrice(text)}
              error={hasError("price")}
            />
          </View>
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
            ADD DISCOUNT
          </Text>

          <TextInput
            label="Discount"
            keyboardType="number-pad"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={discount}
            onChangeText={(text) => setDiscount(text)}
          />
          <HelperText>Must be an amount</HelperText>
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
            ADD TAX
          </Text>

          <TextInput
            label="Tax"
            keyboardType="number-pad"
            style={{ width: "100%", backgroundColor: "#fff" }}
            value={tax}
            onChangeText={(text) => setTax(text)}
          />
          <HelperText>Must be an amount</HelperText>
        </View>
      </ScrollView>

      <View
        style={{
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <View>
          <Text>Total Amount</Text>
          <Text
            style={{
              color: "#047EE4",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {getCurrency(total)}
          </Text>
        </View>
        <Button
          uppercase={false}
          style={{
            width: "50%",
            borderRadius: 5,
            textTransform: "capitalize",
          }}
          mode="contained"
          onPress={() => handleSubmit()}
        >
          Add Item
        </Button>
      </View>
    </View>
  );
};

export default AddItem;
