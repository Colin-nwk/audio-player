import { View, Text, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const AudioListItem = React.memo(({ audio, onOptionPressed }) => {
  const { width, height } = Dimensions.get("window");
  //   const onOptionPressed = () => {};
  const convertTime = (time) => {
    if (time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.ceil(time % 60);
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  };

  return (
    <View
      className="flex-row justify-between items-center  mx-auto p-1 border-b border-gray-200 py-4"
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
      <Pressable
        className="basis-10 p-2"
        onPress={() => {
          onOptionPressed();
          console.warn("call modal");
        }}
      >
        <Entypo name="dots-three-vertical" size={24} color="#050911" />
      </Pressable>
    </View>
  );
});
// bg-[#050911]
export default AudioListItem;

// const AudioListItem = React.memo(({ audio, onOptionPressed }) => {
//   // Render audio list item
// });
