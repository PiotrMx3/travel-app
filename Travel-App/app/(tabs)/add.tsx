import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors";
import {FontSize, FontWeight} from "@/constants/Typography";
import {Spacing, BorderRadius} from "@/constants/Spacing";

const Add = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}
    >
      <Image
        source={require("../../assets/images/600x400.png")}
        style={styles.image}
      />

      <View style={styles.form}>
        <Text style={styles.title}>Add Discovery</Text>
        <Text style={styles.subtitle}>Share your next destination</Text>

        <TextInput
          style={styles.input}
          placeholder="Discovery Title"
          placeholderTextColor={Colors.textSecondary}
        />
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Discovery Description"
          placeholderTextColor={Colors.textSecondary}
          multiline
        />

        <Pressable
          style={({pressed}) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => alert("pressed")}
        >
          <Text style={styles.buttonText}>Save Discovery</Text>
        </Pressable>
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
});

export default Add;
