import { Text, View, Alert } from "react-native";
import React, { Component, createContext } from "react";
import * as MediaLibrary from "expo-media-library";

export const AudioContext = createContext();
export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
    };
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

  getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    console.warn(media.assets.length);
    //     console.warn(media.assets);
    this.setState({ ...this.state, audioFiles: media.assets });

    //     console.warn(this.state.audioFiles);
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
      this.getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      //FIXME: write a function to call system permission again
      this.setState({ ...this.state, permissionError: true });
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        this.permissionAlert();
      }
      if (status === "granted") {
        this.getAudioFiles();
      }
      if (status === "denied" && !canAskAgain) {
        this.setState({ ...this.state, permissionError: true });
      }
    }
  };
  componentDidMount() {
    this.getPermission();
  }

  render() {
    if (this.state.permissionError) {
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 25, textAlign: "center", color: "red" }}>
          It looks like you haven't accept the permission.
        </Text>
      </View>;
    }
    return (
      <AudioContext.Provider
        value={{
          audioFiles: this.state.audioFiles,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
