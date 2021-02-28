import React from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useSelector } from "react-redux";

const SideDrawer = (props) => {
  const profile = useSelector((state) => state.app.profileState.userData);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: profile?.logo,
            }}
            size={70}
          />
          <Title style={styles.title}>{profile?.fullname}</Title>
          <Caption style={styles.caption}>{profile?.companyName}</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Invoice"
            onPress={() => props.navigation.navigate("Invoice")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Clients"
            onPress={() => props.navigation.navigate("Clients")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Feather name="box" color={color} size={size} />
            )}
            label="Items"
            onPress={() => props.navigation.navigate("Items")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Settings"
            onPress={() => props.navigation.navigate("Settings")}
          />
        </Drawer.Section>
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="exit-outline" color={color} size={size} />
          )}
          label="Signout"
          onPress={() => {
            ToastAndroid.show("Signed out!", ToastAndroid.LONG);
            auth().signOut();
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingTop: 80,
    paddingBottom: 30,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
export default SideDrawer;
