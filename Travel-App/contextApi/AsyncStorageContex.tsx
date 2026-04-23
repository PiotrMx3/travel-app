import upsertUser from "@/database/upsertUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import React from "react";
import {useEffect, useState} from "react";
import {Alert} from "react-native";

interface IUserData {
  user: {
    created_at: string | null;
    id: string;
    username: string;
  } | null;
}

export interface IAsyncStorageContext {
  name: string;
  user: IUserData;
  loading: boolean;
  handleName: (name: string) => void;
  handleLogout: () => void;
}

export const AsyncStorageContext = React.createContext<IAsyncStorageContext>({
  name: "",
  user: {user: null},
  loading: false,
  handleName: () => {},
  handleLogout: () => {},
});

export const AsyncStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<IUserData>({user: null});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;
    async function laodFromStorage() {
      setLoading(true);
      try {
        const userName = (await AsyncStorage.getItem("userName")) ?? "";
        const userFromStorage = (await AsyncStorage.getItem("user")) ?? "";

        if (!ignore) {
          if (userFromStorage !== "" && userName !== "") {
            setName(userName);
            setUser(JSON.parse(userFromStorage));
          }
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    laodFromStorage();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (name === "") return;
    let ignore = false;
    async function saveUserToDb() {
      setLoading(true);

      try {
        const {data, error} = await upsertUser(name);
        if (error) {
          console.error(error);
          handleLogout();
          return;
        }

        if (data !== null) {
          setUser({user: data[0]});
          await AsyncStorage.setItem("user", JSON.stringify({user: data[0]}));
          await AsyncStorage.setItem("userName", name);
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    saveUserToDb();
    return () => {
      ignore = true;
    };
  }, [name]);

  const handleName = (name: string) => {
    if (name === "" || name === null) {
      Alert.alert("Name can not be empty");
      return;
    }
    setName(name);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("user");

    setName("");
    setUser({user: null});
    router.replace("/");
  };

  return (
    <AsyncStorageContext.Provider
      value={{
        name: name,
        user: user,
        loading: loading,
        handleName: handleName,
        handleLogout: handleLogout,
      }}
    >
      {children}
    </AsyncStorageContext.Provider>
  );
};
