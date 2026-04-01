import {useLocalSearchParams} from "expo-router";
import {Text} from "react-native";

const Details = () => {
  const {id} = useLocalSearchParams<{id: string}>();

  return <Text>details {id}</Text>;
};

export default Details;
