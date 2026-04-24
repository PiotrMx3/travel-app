import {DiscoveryCardProp} from "@/components/DiscoveryCard/DiscoveryCard";
import {Colors} from "@/constants/Colors";
import {BorderRadius, Spacing} from "@/constants/Spacing";
import {FontSize, FontWeight} from "@/constants/Typography";
import {DbContext} from "@/contextApi/DbContext";
import {useLocalSearchParams} from "expo-router";
import {useContext} from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Details = () => {
  const {id} = useLocalSearchParams<{id: string}>();
  const {data, loading} = useContext(DbContext);

  const item: DiscoveryCardProp | undefined = data.find((i) => i.id === id);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={styles.loader}
      />
    );
  }

  if (item === undefined) return null;
  // TODO: Error handling in UI — not found page

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        <Image
          source={{uri: item.image_url}}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.body}>
          {/* Title */}
          <Text style={styles.title}>{item.title}</Text>

          {/* Description */}
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}

          {/* Coordinates */}
          {item.latitude !== null && item.longitude !== null ? (
            <View style={styles.coordsBox}>
              <Text style={styles.coordsLabel}>Coordinates</Text>
              <Text style={styles.coordsValue}>
                {item.latitude.toFixed(4)} N, {item.longitude.toFixed(4)} E
              </Text>
            </View>
          ) : null}

          {/* Map placeholder */}
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map coming soon</Text>
          </View>
        </View>
      </ScrollView>

      {/* Edit button — fixed at bottom */}
      <View style={styles.footer}>
        <Pressable
          style={({pressed}) => [
            styles.editButton,
            pressed && styles.editButtonPressed,
          ]}
        >
          <Text style={styles.editButtonText}>Edit</Text>
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
  image: {
    width: "97%",
    height: 280,
    alignSelf: "center",
    borderRadius: BorderRadius.md,
  },
  body: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  description: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    color: Colors.textSecondary,
    lineHeight: FontSize.md * 1.5,
  },
  coordsBox: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  coordsLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  coordsValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  mapPlaceholderText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  editButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  editButtonPressed: {
    backgroundColor: Colors.primaryLight,
  },
  editButtonText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
});

export default Details;
