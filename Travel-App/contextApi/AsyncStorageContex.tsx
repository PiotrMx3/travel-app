import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import React from "react";
import {useEffect, useState} from "react";
import {Alert} from "react-native";

export interface IAsyncStorageContext {
  name: string;
  loading: boolean;
  handleName: (name: string) => void;
  handleLogout: () => void;
}

export const AsyncStorageContext = React.createContext<IAsyncStorageContext>({
  name: "",
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;
    async function laodFromStorage() {
      setLoading(true);
      try {
        const userName = (await AsyncStorage.getItem("userName")) ?? "";

        if (!ignore) {
          setName(userName);
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
    async function setStorage() {
      await AsyncStorage.setItem("userName", name);
    }
    setStorage();
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
    setName("");
    router.replace("/");
  };

  return (
    <AsyncStorageContext.Provider
      value={{
        name: name,
        loading: loading,
        handleName: handleName,
        handleLogout: handleLogout,
      }}
    >
      {children}
    </AsyncStorageContext.Provider>
  );
};
