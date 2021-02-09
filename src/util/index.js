import React from "react";
import { View, Text } from "react-native";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export const getCurrency = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHS",
  }).format(number);
};

export const createAndSavePDF = async (html) => {
  try {
    let isShared = false;

    const permission = await MediaLibrary.requestPermissionsAsync();
    const { uri } = await Print.printToFileAsync({ html });

    isShared = await Sharing.shareAsync(uri);

    if (permission.granted) {
      await MediaLibrary.createAssetAsync(uri);
      isShared = true;
    }

    if (!isShared) {
      throw new Error("Something went wrong...");
    }
  } catch (error) {
    throw error;
  }
};
