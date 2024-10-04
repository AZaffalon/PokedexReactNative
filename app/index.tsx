import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemeColors from "@/hooks/useThemeColors"; 

export default function Index() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style= {[styles.container, {backgroundColor: colors.primary}]}>
      <ThemedText variant="headline" color="grayWhite">Pokédex</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1
  }
})