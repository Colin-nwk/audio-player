import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AudioList = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>AudioList</Text>
    </View>
  );
};

export default AudioList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
