import {useState} from "react";
import * as Location from "expo-location";
import {Alert} from "react-native";

// interface IUseLocation {
//   location: Location.LocationObject | null;
//   handleLocation: () => void;
//   loading: boolean;
//   locationName: string | null;
// }

interface IUseLocation {
  result: {
    location: Location.LocationObject;
    locationName: string;
  } | null;
  loading: boolean;
  handleLocation: () => void;
}

const useLocation = (): IUseLocation => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string | null>(null);

  async function getCurrentLocation() {
    setLoading(true);
    try {
      let {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Access denied",
          "Permission to access location was denied",
        );
        return;
      }
      await new Promise((r) => setTimeout(r, 2000));

      let location = await Location.getCurrentPositionAsync({});
      let deatilsLocation = await Location.reverseGeocodeAsync(location.coords);
      setLocation(location);
      setLocationName(deatilsLocation[0].city);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const validResult = location !== null && locationName !== null;

  return {
    result: validResult
      ? {
          location: location,
          locationName: locationName,
        }
      : null,
    handleLocation: getCurrentLocation,
    loading: loading,
  };
};

export default useLocation;
