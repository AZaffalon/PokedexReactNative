import { ThemedText } from "@/components/ThemedText";
import { FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import useThemeColors from "@/hooks/useThemeColors";
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonId } from "@/functions/pokemon";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { Row } from "@/components/Row";
import { SortButton } from "@/components/SortButton";
import { RootView } from "@/components/RootView";

type Pokemon = {
  name: string;
  id: number;
};

export default function Index() {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery(
    "/pokemon-species?limit=21"
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"id" | "name">("id");
  const pokemons: Pokemon[] =
    data?.pages.flatMap((page) =>
      page.results.map((r) => ({
        name: r.name,
        id: getPokemonId(r.url),
      }))
    ) ?? [];
  const filteredPokemons = [
    ...(search
      ? pokemons.filter(
          (p) =>
            p.name.includes(search.toLowerCase()) || p.id.toString() === search
        )
      : pokemons),
  ].sort((a, b) => (a[sort] < b[sort] ? -1 : 1));

  const renderCard = ({ item }: { item: Pokemon }) => (
    <PokemonCard id={item.id} name={item.name} style={{ flex: 1 / 3 }} />
  );

  return (
    <RootView>
      <Row style={styles.header} gap={16}>
        <Image
          source={require("@/assets/images/Pokeball.png")}
          style={styles.pokeball}
        />
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </Row>
      <Row gap={16} style={styles.form}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sort} onChange={setSort} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.primary} /> : null
          }
          renderItem={renderCard}
          onEndReached={search ? undefined : () => fetchNextPage()}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  body: {
    flex: 1,
    marginTop: 24,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
    paddingTop: 24,
  },
  pokeball: {
    width: 24,
    height: 24,
    tintColor: "#FFF",
  },
  form: {
    paddingHorizontal: 12,
  },
});
