import React, { useState } from "react";
import { View, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { Button, Title, Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { SET_APP_STATE } from "../redux/types";

const ChooseTemplate = ({ navigation }) => {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.app.appState.template);
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const templates = [
    { type: 1, image: require("../assets/images/pic3.jpg") },
    { type: 2, image: require("../assets/images/pic.png") },
    { type: 3, image: require("../assets/images/pic2.png") },
    { type: 4, image: require("../assets/images/pic4.png") },
  ];

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
        <Appbar.Content title="Choose Template" />
      </Appbar.Header>

      <View
        style={{
          width: "100%",
          padding: "4%",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {templates.map((item, index) => (
          <View
            key={index}
            style={{
              borderWidth: template == item.type ? 5 : 0,
              borderColor: "#047EE4",
              height: 250,
              width: "47%",
              marginBottom: 20,
              backgroundColor: "#ddd",
              borderRadius: 5,
            }}
          >
            <RectButton
              onPress={() => {
                setSelectedTemplate(index);
                dispatch({
                  type: SET_APP_STATE,
                  payload: {
                    template: item.type,
                  },
                });
                navigation.pop();
              }}
              style={{ flex: 1, overflow: "hidden" }}
            >
              <Image
                source={item.image}
                style={{ resizeMode: "cover", width: "100%", height: 240 }}
              />
            </RectButton>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChooseTemplate;
