import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {useEffect, useState} from "react";

export interface IAsyncStorageContext {
  name: string;
  loading: boolean;
  error: string;
  handleName: (name: string) => void;
}

export const AsyncStorageContext = React.createContext<IAsyncStorageContext>({
  name: "",
  loading: false,
  error: "",
  handleName: async () => {},
});

export const AsyncStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
    setError("");

    if (name === "" || name === null) {
      setError("Name Cant be empty");
      return;
    }
    setName(name);
  };

  return (
    <AsyncStorageContext.Provider
      value={{
        name: name,
        loading: loading,
        error: error,
        handleName: handleName,
      }}
    >
      {children}
    </AsyncStorageContext.Provider>
  );
};
