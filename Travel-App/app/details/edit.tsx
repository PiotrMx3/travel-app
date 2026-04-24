import {DiscoveryCardProp} from "@/components/DiscoveryCard/DiscoveryCard";
import {Colors} from "@/constants/Colors";
import {BorderRadius, Spacing} from "@/constants/Spacing";
import {FontSize, FontWeight} from "@/constants/Typography";
import {DbContext} from "@/contextApi/DbContext";
import updateDiscovery from "@/database/updateCard";
import {router, useLocalSearchParams} from "expo-router";
import {useContext, useEffect, useState} from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Edit = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const {data, loading, reloadData} = useContext(DbContext);
  const insets = useSafeAreaInsets();

  const item: DiscoveryCardProp | undefined = data.find((i) => i.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // needed to re render screen after successed save.:)
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description ?? "");
    }
  }, [item]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={styles.loader}
      />
    );
  }

  if (!item) return null;

  const handleSave = async () => {
    const error = await updateDiscovery({
      id: item.id,
      title: title,
      description: description,
    });

    if (error.error !== null) {
      Alert.alert("Something went wrong try again");
      return;
    }

    reloadData();
    router.back();
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Discovery Title"
            placeholderTextColor={Colors.textSecondary}
            submitBehavior="blurAndSubmit"
            returnKeyType="done"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.inputMultiline]}
            placeholder="Discovery Description"
            placeholderTextColor={Colors.textSecondary}
            multiline
            submitBehavior="blurAndSubmit"
            returnKeyType="done"
          />
        </View>
      </ScrollView>

      <View
        style={[styles.footer, {paddingBottom: insets.bottom || Spacing.md}]}
      >
        <Pressable
          style={({pressed}) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loader: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  body: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: Spacing.xs,
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
    height: 120,
    textAlignVertical: "top",
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  saveButtonPressed: {
    backgroundColor: Colors.primaryLight,
  },
  saveButtonText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
});

export default Edit;
