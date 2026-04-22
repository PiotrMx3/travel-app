import saveDiscovery, {ICardToSave} from "@/database/saveDiscovery";
import uploadImage from "@/database/uploadImage";
import {useState} from "react";

interface IHandleSave extends Omit<ICardToSave, "image_url"> {
  imageUri: string;
  imageBase64: string;
  mimeType: string;
}

interface IUseSaveDiscovery {
  loading: boolean;
  error: string;
  success: boolean;
  handleSave: ({
    username,
    title,
    description,
    location_name,
    latitude,
    longitude,
    imageUri,
    imageBase64,
    mimeType,
  }: IHandleSave) => void;
}

const useSaveDiscovery = (): IUseSaveDiscovery => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSave = async ({
    username,
    title,
    description,
    location_name,
    latitude,
    longitude,
    imageUri,
    imageBase64,
    mimeType,
  }: IHandleSave) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const upload = await uploadImage(mimeType, imageUri, imageBase64);
      if (upload.error) throw new Error("Upload went wrong!");

      const image_url = upload.data?.publicPath || "";

      const saveToDb = await saveDiscovery({
        username,
        title,
        description,
        image_url,
        location_name,
        latitude,
        longitude,
      });

      if (saveToDb.error) throw new Error("Saving went wrong!");

      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setSuccess(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, success, handleSave: handleSave};
};

export default useSaveDiscovery;
