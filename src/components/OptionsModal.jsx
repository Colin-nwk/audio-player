import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React from "react";
// import { StatusBar } from "react-native";

const OptionsModal = React.memo(({ visible, onClose, currentItem }) => {
  const onPlayPress = () => {
    console.warn("Play");
  };
  const onAddToPlayListPress = () => {
    console.warn("Add To Play List");
  };
  return (
    <>
      {/* <StatusBar hidden /> */}
      <Modal animationType="slide" visible={visible} transparent>
        <View className="absolute bottom-0 left-0 right-0 px-16 bg-white backdrop-blur-0 pb-10 rounded-t-3xl z-20">
          <Text
            className="font-bold text-xl py-10 text-[#050911] leading-loose"
            numberOfLines={2}
          >
            {currentItem.filename}
          </Text>
          <View className="flex-row gap-20">
            <Pressable onPress={onPlayPress}>
              <Text className="text-lg py-2 uppercase leading-loose">Play</Text>
            </Pressable>
            <Pressable onPress={onAddToPlayListPress}>
              <Text className="text-lg py-2 uppercase leading-loose">
                Add to play list
              </Text>
            </Pressable>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="opacity-50 absolute w-screen h-screen top-0 left-0 right-0 bottom-0 bg-[#050911]" />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
});

export default OptionsModal;
