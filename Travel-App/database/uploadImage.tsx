import {supabase} from "./supabase";
import {decode} from "base64-arraybuffer";
import {StorageError} from "@supabase/storage-js";

interface IUploadData {
  data: {
    id: string;
    path: string;
    fullPath: string;
    publicPath: string;
  } | null;
  error: StorageError | null;
}

type uploadImageType = (
  mimeType: string,
  uri: string,
  imageBas64: string,
) => Promise<IUploadData>;

const uploadImage: uploadImageType = async (mimeType, uri, imageBas64) => {
  const bucketName = process.env.EXPO_PUBLIC_SUPABASE_BUCKET!;

  const imageName = uri.split("/").pop();
  const path = `public/${Date.now()}/${imageName}`;

  let {data, error} = await supabase.storage
    .from(bucketName)
    .upload(path, decode(imageBas64), {
      contentType: mimeType,
    });

  if (error !== null) return {data: null, error};

  const {data: publicData} = supabase.storage
    .from(bucketName)
    .getPublicUrl(path);
  return {data: {...data!, publicPath: publicData.publicUrl}, error: null};
};

export default uploadImage;
