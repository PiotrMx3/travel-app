import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {Colors} from "@/constants/Colors";
import {Spacing} from "@/constants/Spacing";
import {FontSize, FontWeight} from "@/constants/Typography";
import {FontAwesome} from "@expo/vector-icons";
import {Redirect, Stack, router} from "expo-router";
import {useContext} from "react";
import {ActivityIndicator, Pressable, Text} from "react-native";

const DetailsLayout = () => {
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
    <Stack
      screenOptions={{
        headerStyle: {backgroundColor: Colors.background},
        headerShadowVisible: false,
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontSize: FontSize.md,
          fontWeight: FontWeight.semibold,
          color: Colors.text,
        },
        contentStyle: {backgroundColor: Colors.background},
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Details",
          animation: "fade",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({pressed}) => [{opacity: pressed ? 0.6 : 1}]}
            >
              <FontAwesome
                style={{marginInline: 10}}
                name="chevron-left"
                size={16}
                color={Colors.primary}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          presentation: "modal",
          title: "Edit",
          headerStyle: {backgroundColor: Colors.surface},
          headerShadowVisible: true,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({pressed}) => [{opacity: pressed ? 0.6 : 1}]}
            >
              <Text
                style={{
                  fontSize: FontSize.md,
                  fontWeight: FontWeight.medium,
                  color: Colors.error,
                }}
              >
                Cancel
              </Text>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default DetailsLayout;
