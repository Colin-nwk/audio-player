// import React, { useContext, useState } from "react";
// import { Text, StyleSheet, View, FlatList } from "react-native";
// import { AudioContext } from "../context/class/AudioProvider";
// import { SafeAreaView } from "react-native-safe-area-context";
// import OptionsModal from "../components/OptionsModal";

// import AudioListItem from "../components/AudioListItem";

// import { FlashList } from "@shopify/flash-list";

// const AudioList = () => {
//   const { audioFiles, audioCount } = useContext(AudioContext);
//   const [optionsModalVisible, setOptionsModalVisible] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);

//   useEffect(() => {
//     // console.warn(audioCount);
//     setOptionsModalVisible(false);
//   }, []);

//   const handleOptionPress = (item) => {
//     setCurrentItem(item);
//     setOptionsModalVisible(true);
//     console.warn(audioCount);
//   };

//   const handleCloseModal = () => {
//     setOptionsModalVisible(false);
//   };

//   return (
//     <SafeAreaView>
//       <View>
//         {/* <FlashList
//           data={audioFiles}
//           renderItem={({ item }) => (
//             <AudioListItem
//               audio={item}
//               onOptionPressed={() => handleOptionPress(item)}
//             />
//           )}
//           keyExtractor={(item) => item.id.toString()}
//           estimatedItemSize={audioCount}
//         /> */}
//         <FlatList
//           data={audioFiles}
//           renderItem={({ item }) => (
//             <AudioListItem
//               audio={item}
//               onOptionPressed={() => handleOptionPress(item)}
//             />
//           )}
//           keyExtractor={(item) => item.id.toString()}
//           windowSize={20}
//         />

//         <OptionsModal
//           currentItem={currentItem}
//           visible={optionsModalVisible}
//           onClose={handleCloseModal}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AudioList;

//TODO: new code

import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AudioContext } from "../context/class/AudioProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import OptionsModal from "../components/OptionsModal";
import AudioListItem from "../components/AudioListItem";

const AudioList = () => {
  const { audioFiles, audioCount, fetchNextPage } = useContext(AudioContext);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setOptionsModalVisible(false);
  }, []);

  const handleOptionPress = (item) => {
    setCurrentItem(item);
    setOptionsModalVisible(true);
  };

  const handleCloseModal = () => {
    setOptionsModalVisible(false);
  };

  const handleLoadMore = () => {
    if (audioFiles.length < audioCount) {
      setLoadingMore(true);
      fetchNextPage().then(() => setLoadingMore(false));
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#999999" />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={audioFiles}
          renderItem={({ item }) => (
            <AudioListItem
              audio={item}
              onOptionPressed={() => handleOptionPress(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          windowSize={20}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />

        <OptionsModal
          currentItem={currentItem}
          visible={optionsModalVisible}
          onClose={handleCloseModal}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});

export default AudioList;
