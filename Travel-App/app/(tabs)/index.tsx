import {FontAwesome} from "@expo/vector-icons";
import {Tabs} from "expo-router";
import {Text} from "react-native";

const Index = () => {
  return (
    <>
      <Tabs.Screen
        options={{
          // Tytuł w tab barze i headerze
          title: "Home",

          // Ikona w tab barze
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesome name="home" size={size} color={color} />
          ),

          // Ukryj z tab bara (ale route nadal działa)
          href: null,

          // Pokaż/ukryj header nad ekranem
          headerShown: true,

          // Odznaka z liczbą (np. powiadomienia)
          tabBarBadge: 3,

          // Kolor aktywnej zakładki
          tabBarActiveTintColor: "blue",

          // Kolor nieaktywnej zakładkir
          tabBarInactiveTintColor: "gray",

          // Tło tab bara
          tabBarStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Text>Tabs Index</Text>
    </>
  );
};

export default Index;
