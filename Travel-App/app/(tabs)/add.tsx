import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import {Colors} from "@/constants/Colors";
import {FontSize, FontWeight} from "@/constants/Typography";
import {Spacing, BorderRadius} from "@/constants/Spacing";
import Entypo from "@expo/vector-icons/Entypo";
import useSaveDiscovery from "@/hooks/useSaveDiscovery";
import {useContext, useEffect, useState} from "react";
import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {router, useFocusEffect} from "expo-router";
import React from "react";
import useLocation from "@/hooks/useLocation";
import useImagepicker from "@/hooks/useImagepicker";
import {isValidImagePicker, isValidLocation} from "@/helpers/validation";

//TODO: Button inactive when form is not done

const Add = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const {
    result: imagePickerResult,
    handleImage,
    handleReset,
  } = useImagepicker();
  const {
    loading: loadingSaveDiscovery,
    error,
    success,
    handleSave,
  } = useSaveDiscovery();
  const {user} = useContext(AsyncStorageContext);
  const {
    result: locationResult,
    handleLocation,
    loading: loadingLocation,
  } = useLocation();

  const imageSource = imagePickerResult?.imageUri
    ? {uri: imagePickerResult.imageUri}
    : require("../../assets/images/600x400.png");

  const isValid =
    title !== "" &&
    isValidImagePicker(imagePickerResult) &&
    isValidLocation(locationResult);

  const save = () => {
    if (!user.user) return;
    if (!isValid) return;

    handleSave({
      username: user.user.username,
      title: title,
      description: description,
      location_name: locationResult.locationName,
      latitude: locationResult.location.coords.latitude,
      longitude: locationResult.location.coords.longitude,
      imageUri: imagePickerResult.imageUri,
      imageBase64: imagePickerResult.imageBase64,
      mimeType: imagePickerResult.mimeType,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("focus");
      return () => {
        console.log("focus gone");
      };
    }, []),
  );

  useEffect(() => {
    // Both False at start
    if (success) {
      Alert.alert("Discovery has been sucessed add!");
      setTitle("");
      setDescription("");
      handleReset();
      router.push("/Home");
    } else if (error) {
      Alert.alert("Something went wrong try again!");
      setTitle("");
      setDescription("");
      handleReset();
      router.push("/Home");
    }
  }, [success, error]);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleImage}>
        <Image source={imageSource} style={styles.image} />
      </Pressable>

      <View style={styles.form}>
        <Text style={styles.title}>Add Discovery</Text>
        <Text style={styles.subtitle}>Share your next destination</Text>

        <TextInput
          onChangeText={(text) => setTitle(text)}
          value={title}
          style={styles.input}
          placeholder="Discovery Title"
          placeholderTextColor={Colors.textSecondary}
        />
        <TextInput
          onChangeText={(text) => setDescription(text)}
          value={description}
          style={[styles.input, styles.inputMultiline]}
          placeholder="Discovery Description"
          placeholderTextColor={Colors.textSecondary}
          multiline
        />

        <View style={styles.locationRow}>
          <Entypo name="location-pin" size={40} color={Colors.primary} />
          <Pressable onPress={handleLocation}>
            {loadingLocation ? (
              <ActivityIndicator
                size="large"
                color={Colors.primary}
                style={styles.loader}
              />
            ) : locationResult === null ? (
              <Text style={styles.locationText}>Load location</Text>
            ) : (
              <Text style={styles.locationText}>Locatie Saved !</Text>
            )}
          </Pressable>
        </View>

        {loadingSaveDiscovery ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.loader}
          />
        ) : (
          <Pressable
            style={({pressed}) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={save}
          >
            <Text style={styles.buttonText}>Save Discovery</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: "80%",
    height: 220,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  form: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  buttonPressed: {
    backgroundColor: Colors.primaryLight,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  locationText: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
  loader: {
    flex: 1,
  },
});

export default Add;
