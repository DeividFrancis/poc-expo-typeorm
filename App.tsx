import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useDatabaseInitialize } from "./src/hooks/use-database-initialize";
import { Home } from "./src/pages/Home";

export default function App() {
  const { ready } = useDatabaseInitialize();

  if (!ready) {
    return (
      <View className="flex-1 justify-center itens-center bg-zinc-900">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}
