import {AsyncStorageProvider} from "@/contextApi/AsyncStorageContex";
import {Stack} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AsyncStorageProvider>
        <Stack screenOptions={{headerShown: false}} />;
      </AsyncStorageProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
