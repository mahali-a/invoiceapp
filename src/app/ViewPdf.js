import * as React from "react";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import { FlatList, RectButton } from "react-native-gesture-handler";
import { CommonActions, DrawerActions } from "@react-navigation/native";
import {
  Appbar,
  Button,
  FAB,
  Headline,
  TextInput,
  Title,
} from "react-native-paper";
import Pdf from "react-native-pdf";

const ViewPdf = ({ navigation, route }) => {
  const params = route.params;
  const [sourceUri, setSourceUri] = React.useState(params.item);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Appbar.Header>
        <Appbar.Action onPress={() => navigation.pop()} icon="arrow-left" />

        <Appbar.Content title="Invoice" />
      </Appbar.Header>

      <Pdf
        source={{ uri: sourceUri }}
        onLoadComplete={(numberOfPages, filePath) => {}}
        onPageChanged={(page, numberOfPages) => {}}
        onError={(error) => {}}
        onPressLink={(uri) => {}}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ViewPdf;
