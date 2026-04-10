import Onboarding from "@/components/Onboarding/Onboarding";
import {AsyncStorageContext} from "@/hooks/AsyncStorageContex";
import {Redirect} from "expo-router";
import {useContext} from "react";
import {View} from "react-native";

const Index = () => {
  const {name} = useContext(AsyncStorageContext);

  if (name !== "" && name !== null) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <View style={{}}>
      <Onboarding />
    </View>
  );
};

export default Index;
