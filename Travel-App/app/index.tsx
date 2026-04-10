import Onboarding from "@/components/Onboarding/Onboarding";
import {Redirect} from "expo-router";
import {View} from "react-native";

const Index = () => {
  const redirect = "y";

  if (redirect === "y") {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <View style={{}}>
      <Onboarding />
    </View>
  );
};

export default Index;
