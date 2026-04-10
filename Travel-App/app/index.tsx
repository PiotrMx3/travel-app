import Onboarding from "@/components/Onboarding/Onboarding";
import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {Redirect} from "expo-router";
import {useContext} from "react";

const Index = () => {
  const {name} = useContext(AsyncStorageContext);

  if (name !== "" && name !== null) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Onboarding />;
};

export default Index;
