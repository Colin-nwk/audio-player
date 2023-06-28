import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/routes/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
