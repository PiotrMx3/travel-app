import {Redirect, Tabs} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";
import {DbContextProvider} from "@/contextApi/DbContext";
import {Colors} from "@/constants/Colors";
import {FontSize} from "@/constants/Typography";
import {useContext} from "react";
import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {ActivityIndicator} from "react-native";

const tabBarStyle = {
  backgroundColor: Colors.surface,
  borderTopColor: Colors.border,
  borderTopWidth: 1,
  height: 80,
};

const TabsLayout = () => {
  const {name, loading} = useContext(AsyncStorageContext);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{flex: 1}}
      />
    );
  }

  if (!name) {
    return <Redirect href="/" />;
  }

  return (
    <DbContextProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarStyle: tabBarStyle,
          tabBarLabelStyle: {fontSize: FontSize.xs},
          tabBarIconStyle: {marginTop: 8},
          tabBarItemStyle: {justifyContent: "center", alignItems: "center"},
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({color}) => (
              <FontAwesome name="home" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Add"
          options={{
            tabBarLabel: "Add",
            tabBarIcon: ({color}) => (
              <FontAwesome name="plus-circle" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Favorites"
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({color}) => (
              <FontAwesome name="heart" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </DbContextProvider>
  );
};

export default TabsLayout;
