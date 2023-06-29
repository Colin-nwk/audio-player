import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import React, { Component } from "react";
import { AudioContext } from "../context/AudioProvider";

import AudioListItem from "../components/AudioListItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default class AudioList extends Component {
  static contextType = AudioContext;

  render() {
    return (
      // <View>
      //   <Text>Hello</Text>
      // </View>
      <SafeAreaView className="">
        <ScrollView className="">
          {this.context.audioFiles.map((item, index) => (
            <Pressable key={item.id}>
              <AudioListItem
                audio={item}
                onOptionPressed={() => console.warn("AudioList 22: pressed")}
              />
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
