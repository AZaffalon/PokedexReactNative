import { Link, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pokemon() {
  const params = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Pokemon {params.id}</Text>
      <Link href={"/"}>Retour</Link>
    </SafeAreaView>
  );
}
