import React from "react";

import PropTypes from "prop-types";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Zocial from "react-native-vector-icons/Zocial";
import Octicons from "react-native-vector-icons/Octicons";
import Fontisto from "react-native-vector-icons/Fontisto";

const Icon = (props) => {
  const { type, name, color, size, onPress, style } = props;
  switch (type) {
    case "AntDesign": {
      return (
        <AntDesign
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "Entypo": {
      return (
        <Entypo
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "Ionicons": {
      return (
        <Ionicons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "SimpleLineIcons": {
      return (
        <SimpleLineIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "FontAwesome5": {
      return (
        <FontAwesome5
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "EvilIcons": {
      return (
        <EvilIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "MaterialIcons": {
      return (
        <MaterialIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "FontAwesome": {
      return (
        <FontAwesome
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "Foundation": {
      return (
        <Foundation
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "MaterialCommunityIcons": {
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "Zocial": {
      return (
        <Zocial
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    case "Octicons": {
      return (
        <Octicons
          name={name}
          style={style}
          color={color}
          size={size ? size : 18}
          onPress={onPress}
        />
      );
    }
    case "Fontisto": {
      return (
        <Fontisto
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }
    case "Feather": {
      return (
        <Feather
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }

    default: {
      return (
        <MaterialIcons
          name={name}
          size={size}
          style={style}
          color={color}
          onPress={onPress}
        />
      );
    }
  }
};

Icon.defaultProps = {
  size: 20,
  style: {},
  onPress: null,
  color: "#000",
};

export default Icon;
