import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Router from "../navigation/Router";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../navigation/rootNavigator";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
