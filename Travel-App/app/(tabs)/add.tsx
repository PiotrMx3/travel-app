import {Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Add = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[{paddingTop: insets.top, paddingBottom: insets.bottom}]}>
        <Text>Add Screen</Text>
      </View>
    </>
  );
};

export default Add;
