import {supabase} from "./supabase";

const deleteCard = async (id: string, image_url: string) => {
  const bucketName = process.env.EXPO_PUBLIC_SUPABASE_BUCKET!;
  const path = image_url.split(`/${bucketName}/`)[1];

  const response = await supabase.from("cards").delete().eq("id", id);

  if (response.success) {
    const {data, error} = await supabase.storage
      .from(bucketName)
      .remove([path]);
    return {success: true};
  }

  return {success: false};
};

export default deleteCard;
