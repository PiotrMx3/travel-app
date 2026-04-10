import {AsyncStorageContext} from "@/contextApi/AsyncStorageContex";
import {useContext, useState} from "react";
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors";
import {FontSize, FontWeight} from "@/constants/Typography";
import {BorderRadius, Spacing} from "@/constants/Spacing";

const Onboarding = () => {
  const [name, setName] = useState<string>("");
  const insets = useSafeAreaInsets();

  const {handleName} = useContext(AsyncStorageContext);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}
    >
      <View style={styles.topSection}>
        <Image
          style={styles.image}
          source={require("../../assets/images/logo_app.png")}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>What's your name?</Text>
        <TextInput
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="default"
          value={name}
          style={styles.textInput}
        />
      </View>

      <View style={styles.bottomSection}>
        <Pressable
          style={({pressed}) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => handleName(name)}
        >
          <Text style={styles.buttonText}>Start discovering</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
  },
  topSection: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
  },
  bottomSection: {
    flex: 0.3,
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    color: Colors.textSecondary,
  },
  textInput: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: Colors.primaryLight,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  pressable: {backgroundColor: "red"},
});

export default Onboarding;
