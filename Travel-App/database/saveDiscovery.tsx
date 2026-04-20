import {PostgrestError} from "@supabase/supabase-js";
import {supabase} from "./supabase";

interface ICardData {
  error: PostgrestError | null;
}
export interface ICardToSave {
  username: string;
  title: string;
  description: string;
  image_url: string;
  location_name: string;
  latitude: number;
  longitude: number;
}
type saveDiscoveryType = ({
  username,
  title,
  description,
  image_url,
  location_name,
  latitude,
  longitude,
}: ICardToSave) => Promise<ICardData>;

const saveDiscovery: saveDiscoveryType = async ({
  username,
  title,
  description,
  image_url,
  location_name,
  latitude,
  longitude,
}) => {
  const {error} = await supabase.from("cards").insert({
    username: username,
    title: title,
    description: description,
    image_url: image_url,
    location_name: location_name,
    latitude: latitude,
    longitude: longitude,
  });

  return {error: error};
};

export default saveDiscovery;
