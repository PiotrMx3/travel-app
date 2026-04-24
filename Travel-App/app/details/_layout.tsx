import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {Colors} from "@/constants/Colors";
import {Redirect, Slot, Stack} from "expo-router";
import {useContext} from "react";
import {ActivityIndicator} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {DbContextProvider} from "@/contextApi/DbContext";

const DetailsLayout = () => {
  const {name, loading} = useContext(AsyncStorageContext);
  const insets = useSafeAreaInsets();

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{flex: 1}}
      />
    );
  }

  if (!name) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <DbContextProvider>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Details",
            animation: "fade",
            contentStyle: {
              paddingTop: 0,
              paddingBottom: insets.bottom,
              backgroundColor: Colors.background,
            },
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Slot />
      </DbContextProvider>
    </>
  );
};

export default DetailsLayout;
