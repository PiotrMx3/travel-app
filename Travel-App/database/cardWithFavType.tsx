import {QueryData} from "@supabase/supabase-js";
import {supabase} from "./supabase";
const cardWithFavQuery = supabase
  .from("cards")
  .select(`*, favourites (id, card_id)`);
type CardWithFavType = QueryData<typeof cardWithFavQuery>;

export default CardWithFavType;
