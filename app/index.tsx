import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemeColors from "@/hooks/useThemeColors"; 
import { Card } from "@/components/Card";

export default function Index() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style= {[styles.container, {backgroundColor: colors.primary}]}>
      <Card>
        <ThemedText variant="headline" color="grayDark">Pokédex</ThemedText>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1
  }
})