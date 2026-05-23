import {Text, View, StyleSheet, Image, Pressable} from "react-native";
import {Colors} from "@/constants/Colors";
import {FontSize, FontWeight} from "@/constants/Typography";
import {BorderRadius, Spacing} from "@/constants/Spacing";
import {router} from "expo-router";
import {useContext} from "react";
import {DbContext} from "@/contextApi/DbContext";
import {FontAwesome} from "@expo/vector-icons";

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
  const {toggleFavourite} = useContext(DbContext);
  const isFavourite = data.favourites.length > 0;

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
        <View style={styles.titleRow}>
          <Text style={styles.title}>{data.title}</Text>
          <Pressable
            onPress={() => toggleFavourite(data.id, isFavourite)}
            style={({pressed}) => [{opacity: pressed ? 0.6 : 1}]}
          >
            <FontAwesome
              name={isFavourite ? "star" : "star-o"}
              size={22}
              color={isFavourite ? Colors.favourite : Colors.textSecondary}
            />
          </Pressable>
        </View>

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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
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
