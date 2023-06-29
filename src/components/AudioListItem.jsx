import { View, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const AudioListItem = ({ audio }) => {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      className="flex-row justify-between items-center  mx-auto p-1 border-b border-gray-200 py-4 hover:bg-slate-50 focus:bg-slate-50"
      // style={{ width: width - 80 }}
    >
      {/* left */}
      <View className="flex-row flex-1">
        <View className=" basis-12 justify-center items-center rounded-full ">
          <Text className="text-3xl p-1 font-bold text-[#050911]">A</Text>
        </View>
        <View className="pl-2.5 mr-10">
          <Text numberOfLines={1} className="text-xl text-[#050911]">
            {audio.filename}
          </Text>
          <Text className="text-sm text-gray-800 " numberOfLines={1}>
            {audio.duration}
          </Text>
        </View>
      </View>
      {/* right */}
      <View className="basis-10">
        <Entypo name="dots-three-vertical" size={24} color="#050911" />
      </View>
    </View>
  );
};
// bg-[#050911]
export default AudioListItem;
