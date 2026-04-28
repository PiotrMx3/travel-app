import {supabase} from "./supabase";

const toggleFavourite = async (
  cardId: string,
  isFavourite: boolean,
  username: string
): Promise<{success: boolean}> => {
  try {
    if (isFavourite) {
      const {error} = await supabase
        .from("favourites")
        .delete()
        .eq("card_id", cardId)
        .eq("username", username);
      if (error) throw new Error(error.message);
    } else {
      const {error} = await supabase
        .from("favourites")
        .insert({card_id: cardId, username});
      if (error) throw new Error(error.message);
    }
    return {success: true};
  } catch (error) {
    if (error instanceof Error)
      console.error("Toggle favourite error:", error.message);
    return {success: false};
  }
};

export default toggleFavourite;
