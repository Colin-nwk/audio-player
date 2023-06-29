import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/routes/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AudioProvider from "./src/context/AudioProvider";
import AudioListItem from "./src/components/AudioListItem";

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AudioProvider>
  );
}
