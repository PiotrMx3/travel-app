import {LocationObject} from "expo-location";

interface IImagePickerResult {
  imageUri: string;
  imageBase64: string;
  mimeType: string;
}

interface IlocationResult {
  location: LocationObject;
  locationName: string;
}

export const isValidImagePicker = (
  val: IImagePickerResult | null,
): val is IImagePickerResult => {
  return val !== null;
};

export const isValidLocation = (
  val: IlocationResult | null,
): val is IlocationResult => {
  return val !== null;
};
