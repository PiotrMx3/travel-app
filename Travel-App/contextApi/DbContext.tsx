import React, {useCallback, useContext, useEffect, useState} from "react";
import {AsyncStorageContext} from "./AsyncStorageContex";
import {supabase} from "@/database/supabase";
import CardWithFavType from "@/database/cardWithFavType";
import toggleFavouriteDb from "@/database/toggleFavourite";

export interface IDbContext {
  data: CardWithFavType;
  loading: boolean;
  reloadData: () => void;
  initLoading: boolean;
  toggleFavourite: (cardId: string, isFavourite: boolean) => Promise<void>;
}

export const DbContext = React.createContext<IDbContext>({
  data: [],
  loading: false,
  reloadData: () => {},
  initLoading: false,
  toggleFavourite: async () => {},
});

export const DbContextProvider = ({children}: {children: React.ReactNode}) => {
  const [data, setData] = useState<CardWithFavType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);
  const {user} = useContext(AsyncStorageContext);

  const handleReload = () => {
    setTrigger((prev) => !prev);
  };
  const handleToggleFavourite = async (
    cardId: string,
    isFavourite: boolean,
  ) => {
    if (user.user === null) return;
    const result = await toggleFavouriteDb(
      cardId,
      isFavourite,
      user.user.username,
    );
    if (result.success) {
      setTrigger((prev) => !prev);
    }
  };
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      if (user.user === null) return;
      try {
        const {data, error} = await supabase
          .from("cards")
          .select(`*, favourites (id, card_id)`)
          .eq(`favourites.username`, user.user.username);

        if (error) throw new Error(error.message);

        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        if (error instanceof Error)
          console.error("Fetching error: ", error.message);
      } finally {
        if (!ignore) {
          setLoading(false);
          setInitLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [trigger, user.user?.username]);

  return (
    <DbContext.Provider
      value={{
        data: data,
        loading: loading,
        reloadData: handleReload,
        initLoading: initLoading,
        toggleFavourite: handleToggleFavourite,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
