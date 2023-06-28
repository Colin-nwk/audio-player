import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import PlayList from "../screens/PlayList";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const AppNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator initialRouteName="Audiolist">
      <BottomTab.Screen
        name="Audiolist"
        component={AudioList}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialIcons name="headset" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <FontAwesome5 name="compact-disc" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Playlist"
        component={PlayList}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialIcons name="library-music" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default AppNavigator;
