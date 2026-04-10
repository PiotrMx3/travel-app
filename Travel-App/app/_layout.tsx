import {AsyncStorageProvider} from "@/hooks/AsyncStorageContex";
import {Stack} from "expo-router";

const RootLayout = () => {
  return (
    <AsyncStorageProvider>
      <Stack screenOptions={{headerShown: false}} />
    </AsyncStorageProvider>
  );
};

export default RootLayout;
