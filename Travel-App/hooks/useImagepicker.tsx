import {useState} from "react";
import {Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface IImagePicker {
  result: {
    imageUri: string;
    imageBase64: string;
    mimeType: string;
  } | null;
  handleImage: () => void;
  handleReset: () => void;
}

const useImagepicker = (): IImagePicker => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

  const resetData = () => {
    setImageBase64(null);
    setUri(null);
    setMimeType(null);
  };

  const pickImageAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Access denied",
        "You must grant access to the gallery to be able to Select an image",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0].base64 && result.assets[0].mimeType) {
        setImageBase64(result.assets[0].base64);
        setUri(result.assets[0].uri);
        setMimeType(result.assets[0].mimeType);
      }
    } else {
      setImageBase64(null);
      setUri(null);
      setMimeType(null);
    }
  };

  const validResult =
    typeof uri === "string" &&
    typeof imageBase64 === "string" &&
    typeof mimeType === "string";

  return {
    result: validResult
      ? {
          imageUri: uri,
          imageBase64: imageBase64,
          mimeType: mimeType,
        }
      : null,
    handleImage: pickImageAsync,
    handleReset: resetData,
  };
};

export default useImagepicker;
