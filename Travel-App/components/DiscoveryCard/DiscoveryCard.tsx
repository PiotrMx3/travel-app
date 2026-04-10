import {Text, View, StyleSheet, Image, Pressable} from "react-native";
import {IDiscoveryItem as IDiscoveryCard} from "@/contextApi/DbContext";
import {Colors} from "@/constants/Colors";
import {FontSize, FontWeight} from "@/constants/Typography";
import {BorderRadius, Spacing} from "@/constants/Spacing";
import {router} from "expo-router";

const DiscoveryCard = ({data}: {data: IDiscoveryCard}) => {
  return (
    <View style={styles.card}>
      {/* <Pressable onPress={() => Alert.alert(`/details/${data.id}`)}> */}
      <Pressable onPress={() => router.push(`/details/${data.id}`)}>
        <Image
          source={{uri: data.image}}
          style={styles.image}
          resizeMode="cover"
        />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>

        <View style={styles.locationBox}>
          <Text style={styles.city}>{data.location.city}</Text>
          <Text style={styles.address}>{data.location.address}</Text>
          <Text style={styles.coordinates}>
            {data.location.lat.toFixed(4)}, {data.location.lng.toFixed(4)}
          </Text>
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
