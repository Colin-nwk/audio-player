import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/routes/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AudioProvider from "./src/context/class/AudioProvider";
import AudioListItem from "./src/components/AudioListItem";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AudioProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AudioProvider>
    </SafeAreaProvider>
  );
}
