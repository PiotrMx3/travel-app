import Onboarding from "@/components/Onboarding/Onboarding";
import {Colors} from "@/constants/Colors";
import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {Redirect} from "expo-router";
import {useContext} from "react";
import {ActivityIndicator} from "react-native";

const Index = () => {
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

  if (name && name !== "") {
    return <Redirect href="/Home" />;
  }
  return <Onboarding />;
};

export default Index;

// NOTE: If the (auth) group is expanded with additional endpoints (e.g., /login, /register)
// in the future, it will be necessary to implement a dedicated (auth)/_layout.tsx
// Currently, the protection logic is only applied within index.tsx, meaning
// other routes in this folder wouldn't automatically redirect authorized users.
