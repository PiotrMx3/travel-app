import {useLocalSearchParams} from "expo-router";
import {Text, View} from "react-native";

const Details = () => {
  const {id} = useLocalSearchParams<{id: string}>();

  return (
    <View style={{flex: 1}}>
      <Text>details {id}</Text>
    </View>
  );
};

export default Details;
