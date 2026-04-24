import {Text, View, StyleSheet, Image, Pressable} from "react-native";
import {Colors} from "@/constants/Colors";
import {FontSize, FontWeight} from "@/constants/Typography";
import {BorderRadius, Spacing} from "@/constants/Spacing";
import {router} from "expo-router";

export interface DiscoveryCardProp {
  created_at: string | null;
  description: string | null;
  id: string;
  image_url: string;
  latitude: number | null;
  location_name: string | null;
  longitude: number | null;
  title: string;
  username: string;
  favourites: {
    id: string;
    card_id: string;
  }[];
}

const DiscoveryCard = ({data}: {data: DiscoveryCardProp}) => {
  return (
    <View style={styles.card}>
      <Pressable onPress={() => router.push(`/details/${data.id}`)}>
        <Image
          source={{uri: data.image_url}}
          style={styles.image}
          resizeMode="cover"
        />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>

        <View style={styles.locationBox}>
          <Text style={styles.city}>{data.location_name}</Text>

          {data.latitude !== null && data.longitude !== null ? (
            <Text style={styles.coordinates}>
              {data.latitude.toFixed(4)} N, {data.longitude.toFixed(4)} E
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  locationBox: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
    gap: Spacing.xs,
  },
  city: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  address: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  coordinates: {
    fontSize: FontSize.xs,
    color: Colors.border,
  },
});

export default DiscoveryCard;
