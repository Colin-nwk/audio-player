import { View, Text, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const AudioListItem = ({ audio, onOptionPressed }) => {
  const { width, height } = Dimensions.get("window");
  //   const onOptionPressed = () => {};
  const convertTime = (time) => {
    if (time) {
      const hours = time / 60;
      const minutes = hours.toString().split(".")[0];
      const percent = parseInt(hours.toString().split(".")[1].slice(0, 2));
      const seconds = Math.ceil((60 * percent) / 100);

      if (parseInt(minutes) < 10 && seconds < 10) {
        return `0${minutes}:0${seconds}`;
      }
      if (parseInt(minutes) < 10) {
        return `0${minutes}:${seconds}`;
      }
      if (seconds < 10) {
        return `${minutes}:${seconds}`;
      }
      return `${minutes}:${seconds}`;
    }
  };
  return (
    <View
      className="flex-row justify-between items-center  mx-auto p-1 border-b border-gray-200 py-4 hover:bg-slate-50 focus:bg-slate-50"
      // style={{ width: width - 80 }}
    >
      {/* left */}
      <View className="flex-row flex-1">
        <View className=" basis-12 justify-center items-center rounded-full ">
          <Text className="text-3xl font-bold text-[#050911] uppercase p-1 ">
            {audio.filename[0]}
          </Text>
        </View>
        <View className="pl-2.5 mr-10">
          <Text numberOfLines={1} className="text-xl text-[#050911]">
            {audio.filename}
          </Text>
          <Text className="text-sm text-gray-800 " numberOfLines={1}>
            {convertTime(audio.duration)}
          </Text>
        </View>
      </View>
      {/* right */}
      <Pressable className="basis-10" onPress={onOptionPressed}>
        <Entypo name="dots-three-horizontal" size={24} color="#050911" />
      </Pressable>
    </View>
  );
};
// bg-[#050911]
export default AudioListItem;
