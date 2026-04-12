import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {Redirect, Slot} from "expo-router";
import {useContext} from "react";
import {ActivityIndicator} from "react-native";
import {Colors} from "@/constants/Colors";

const AuthLayout = () => {
  const {name, loading} = useContext(AsyncStorageContext);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{flex: 1}}
      />
    );
  }

  if (name) {
    return <Redirect href="/Home" />;
  }

  return <Slot />;
};

export default AuthLayout;
