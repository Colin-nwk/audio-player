import { Text, View, Alert } from "react-native";
import React, { Component } from "react";
import * as MediaLibrary from "expo-media-library";

export class AudioProvider extends Component {
  constructor(props) {
    super(props);
  }

  permissionAlert = () => {
    Alert.alert("Permission Required", "This app needs to read audio files!", [
      {
        text: "I am ready",
        onPress: () => this.getPermission(),
      },
      {
        text: "Cancel",
        onPress: () => this.permissionAlert(),
      },
    ]);
  };
  getPermission = async () => {
    //  {
    //       "canAskAgain": true,
    //             "expires": "never",
    //             "granted": false,
    //                   "status": "undetermined"
    // }
    const permission = await MediaLibrary.getPermissionsAsync();
    console.warn(permission);
    if (permission.granted) {
      //TODO: get all audio files
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        //TODO: we are going to display alert that user must allow this permission to work this app

        this.permissionAlert();
      }
      if (status === "granted") {
        //TODO: get all audio files
      }
      if (status === "denied" && !canAskAgain) {
        //TODO: we are going to display alert error to the user
      }
    }
  };
  componentDidMount() {
    this.getPermission();
  }

  render() {
    return (
      <View>
        <Text>AudioProvider</Text>
      </View>
    );
  }
}

export default AudioProvider;
