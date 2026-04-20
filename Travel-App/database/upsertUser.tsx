import {PostgrestError} from "@supabase/supabase-js";
import {supabase} from "./supabase";

interface IUpsertData {
  data:
    | {
        created_at: string | null;
        id: string;
        username: string;
      }[]
    | null;

  error: PostgrestError | null;
}

type UpserUserType = (username: string) => Promise<IUpsertData>;

const upsertUser: UpserUserType = async (username: string) => {
  const {data, error} = await supabase
    .from("users")
    .upsert({username: username}, {onConflict: "username"})
    .select();

  return {data: data, error: error};
};

export default upsertUser;
