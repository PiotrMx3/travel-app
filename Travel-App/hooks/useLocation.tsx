import {useState} from "react";
import * as Location from "expo-location";

interface IUseLocation {
  location: Location.LocationObject | null;
  handleLocation: () => void;
  errorMsg: string | null;
  loading: boolean;
}

const useLocation = (): IUseLocation => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function getCurrentLocation() {
    setLoading(true);
    try {
      let {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    location: location,
    handleLocation: getCurrentLocation,
    errorMsg: errorMsg,
    loading: loading,
  };
};

export default useLocation;
