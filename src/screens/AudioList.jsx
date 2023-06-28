import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { Component } from "react";
import { AudioContext } from "../context/AudioProvider";

export default class AudioList extends Component {
  static contextType = AudioContext;

  render() {
    return (
      // <View>
      //   <Text>Hello</Text>
      // </View>

      <ScrollView>
        {this.context.audioFiles.map((item, index) => (
          <Text
            key={index}
            style={{
              padding: 10,
              borderBottomColor: "red",
              borderBottomWidth: 1,
            }}
          >
            {item.filename}
          </Text>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
