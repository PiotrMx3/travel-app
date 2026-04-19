import {useState} from "react";
import {Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface IImagePicker {
  imageUri: string | null;
  handleImage: () => void;
}

const useImagepicker = (): IImagePicker => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImageAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Toegang geweigerd",
        "U moet toegang tot de galerij toestaan om een afbeelding te kunnen selecteren",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log(result);
    } else {
      setImageUri(null);
    }
  };

  return {imageUri: imageUri, handleImage: pickImageAsync};
};

export default useImagepicker;
