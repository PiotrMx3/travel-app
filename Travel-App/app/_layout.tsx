import {Colors} from "@/constants/Colors";
import {AsyncStorageProvider} from "@/contextApi/AsyncStorageContex";
import {Stack} from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const RootLayoutInner = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: [
          {paddingTop: insets.top},
          {backgroundColor: Colors.background},
        ],
      }}
    />
  );
};

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AsyncStorageProvider>
        <RootLayoutInner />
      </AsyncStorageProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
