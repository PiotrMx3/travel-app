import {supabase} from "./supabase";

export interface ICardToUpdate {
  id: string;
  title: string;
  description: string;
}

const updateDiscovery = async ({id, title, description}: ICardToUpdate) => {
  const {error} = await supabase
    .from("cards")
    .update({title, description})
    .eq("id", id);
  return {error};
};

export default updateDiscovery;
