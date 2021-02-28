import React, { useState, useEffect } from "react";
import { StyleSheet, Text, StatusBar, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch } from "react-redux";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import reducer from "./src/redux";
import { NavigationContainer } from "@react-navigation/native";
import GetStarted from "./src/auth/GetStarted";
import Splash from "./src/auth/Splash";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Signup from "./src/auth/Signup";
import Invoice from "./src/app/Invoice";
import AddInvoice from "./src/app/AddInvoice";
import AddNewClient from "./src/app/AddNewClient";
import ClientList from "./src/app/ClientList";
import AddItem from "./src/app/AddItem";
import Clients from "./src/app/Clients";
import ChooseTemplate from "./src/app/ChooseTemplate";
import SideDrawer from "./src/app/SideDrawer";
import Settings from "./src/app/Settings";
import auth from "@react-native-firebase/auth";

import { setClientState } from "./src/redux/actions";
import ViewPdf from "./src/app/ViewPdf";
import Login from "./src/auth/Login";
import Items from "./src/app/Items";
import ItemList from "./src/app/ItemList";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#047EE4",
      accent: "#f1c40f",
    },
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
  }

  const InvoiceStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Invoice" component={Invoice} />
        <Stack.Screen name="AddInvoice" component={AddInvoice} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="AddNewClient" component={AddNewClient} />
        <Stack.Screen name="ClientList" component={ClientList} />
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="ViewPdf" component={ViewPdf} />
        <Stack.Screen name="ChooseTemplate" component={ChooseTemplate} />
      </Stack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        {/* <Stack.Screen name="Splash" component={Splash} /> */}
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  };
  const middleware = [ReduxThunk];
  const store = createStore(reducer, {}, applyMiddleware(...middleware));

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="#047E" />
        <NavigationContainer>
          {!user ? (
            <AuthStack />
          ) : (
            <Drawer.Navigator
              drawerContent={(props) => <SideDrawer {...props} />}
            >
              <Drawer.Screen name="Invoice" component={InvoiceStack} />
              <Drawer.Screen name="Clients" component={Clients} />
              <Drawer.Screen name="Items" component={Items} />
              <Drawer.Screen
                name="AddItem"
                unmountOnBlur={true}
                component={AddItem}
              />
              <Drawer.Screen name="AddClient" component={AddNewClient} />
              <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
