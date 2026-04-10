import {Stack, useLocalSearchParams} from "expo-router";
import {Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Details = () => {
  const insets = useSafeAreaInsets();

  const {id} = useLocalSearchParams<{id: string}>();

  return (
    <View style={[{paddingTop: insets.top, paddingBottom: insets.bottom}]}>
      <Stack.Screen
        options={{
          title: "Details",
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          animation: "fade",
        }}
      ></Stack.Screen>
      <Text>details {id}</Text>
    </View>
  );
};

export default Details;
