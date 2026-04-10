import {Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Favorites = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[{paddingTop: insets.top, paddingBottom: insets.bottom}]}>
        <Text>Favorites</Text>
      </View>
    </>
  );
};

export default Favorites;
