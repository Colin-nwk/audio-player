// import React, { useState, useEffect, createContext } from "react";
// import { Text, View, Alert } from "react-native";
// import * as MediaLibrary from "expo-media-library";

// export const AudioContext = createContext();

// const AudioProvider = (props) => {
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [permissionError, setPermissionError] = useState(false);
//   const [audioCount, setAudioCount] = useState(null);

//   const permissionAlert = () => {
//     Alert.alert("Permission Required", "This app needs to read audio files!", [
//       {
//         text: "I am ready",
//         onPress: () => getPermission(),
//       },
//       {
//         text: "Cancel",
//         onPress: () => permissionAlert(),
//       },
//     ]);
//   };

//   const getAudioFiles = async () => {
//     let media = await MediaLibrary.getAssetsAsync({
//       mediaType: "audio",
//     });
//     media = await MediaLibrary.getAssetsAsync({
//       mediaType: "audio",
//       first: media.totalCount,
//     });
//     setAudioCount(media.assets.length);
//     console.warn("AudioProvider:39 " + audioCount);
//     setAudioFiles((prevAudioFiles) => [...prevAudioFiles, ...media.assets]);
//   };

//   const getPermission = async () => {
//     const permission = await MediaLibrary.getPermissionsAsync();
//     console.warn("AudioProvider: 60: " + JSON.stringify(permission));

//     if (permission.granted) {
//       getAudioFiles();
//     }

//     if (!permission.canAskAgain && !permission.granted) {
//       setPermissionError(true);
//     }

//     if (!permission.granted && permission.canAskAgain) {
//       const { status, canAskAgain } =
//         await MediaLibrary.requestPermissionsAsync();

//       if (status === "denied" && canAskAgain) {
//         permissionAlert();
//       }

//       if (status === "granted") {
//         getAudioFiles();
//       }

//       if (status === "denied" && !canAskAgain) {
//         setPermissionError(true);
//       }
//     }
//   };

//   useEffect(() => {
//     getPermission();
//   }, []);

//   if (permissionError) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 10,
//         }}
//       >
//         <Text style={{ fontSize: 25, textAlign: "center", color: "red" }}>
//           It looks like you haven't accepted the permission.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <AudioContext.Provider
//       value={{
//         audioFiles,
//         audioCount,
//       }}
//     >
//       {props.children}
//     </AudioContext.Provider>
//   );
// };

// export default AudioProvider;

import React, { useState, useEffect, createContext } from "react";
import { Text, View, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

export const AudioContext = createContext();

const AudioProvider = (props) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);
  const [audioCount, setAudioCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const permissionAlert = () => {
    Alert.alert("Permission Required", "This app needs to read audio files!", [
      {
        text: "I am ready",
        onPress: () => getPermission(),
      },
      {
        text: "Cancel",
        onPress: () => permissionAlert(),
      },
    ]);
  };

  const fetchAudioFiles = async (page) => {
    const pageSize = 20; // Number of audio files per page
    const startIndex = (page - 1) * pageSize;
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: pageSize,
      after: startIndex,
    });

    setAudioCount(media.totalCount);
    setTotalPages(Math.ceil(media.totalCount / pageSize));

    return media.assets;
  };

  const fetchNextPage = async () => {
    if (currentPage >= totalPages) return;

    const nextPage = currentPage + 1;
    const newAudioFiles = await fetchAudioFiles(nextPage);
    setAudioFiles((prevAudioFiles) => [...prevAudioFiles, ...newAudioFiles]);
    setCurrentPage(nextPage);
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if (permission.granted) {
      const initialAudioFiles = await fetchAudioFiles(1);
      setAudioFiles(initialAudioFiles);
    }

    if (!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        permissionAlert();
      }

      if (status === "granted") {
        const initialAudioFiles = await fetchAudioFiles(1);
        setAudioFiles(initialAudioFiles);
      }

      if (status === "denied" && !canAskAgain) {
        setPermissionError(true);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (permissionError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 25, textAlign: "center", color: "red" }}>
          It looks like you haven't accepted the permission.
        </Text>
      </View>
    );
  }

  return (
    <AudioContext.Provider
      value={{
        audioFiles,
        audioCount,
        fetchNextPage,
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
