import DiscoveryCard from "@/components/DiscoveryCard/DiscoveryCard";
import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {DbContext} from "@/contextApi/DbContext";
import {Colors} from "@/constants/Colors";
import {FontSize, FontWeight} from "@/constants/Typography";
import {Spacing} from "@/constants/Spacing";
import {useContext} from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";

const Home = () => {
  //TODO: User.Id From context is needed to save favs.
  const {name, user, handleLogout} = useContext(AsyncStorageContext);
  const {data, loading, reloadData, initLoading} = useContext(DbContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleLogout}>
          <Text style={styles.greeting}>Hallo, {name} 👋</Text>
          <Text style={styles.subtitle}>Discover your next destination</Text>
        </Pressable>
      </View>

      {initLoading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => <DiscoveryCard data={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          onRefresh={reloadData}
          refreshing={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  loader: {
    flex: 1,
  },
  list: {
    paddingBottom: Spacing.lg,
  },
});

export default Home;
