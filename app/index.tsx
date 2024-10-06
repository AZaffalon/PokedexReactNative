import { ThemedText } from "@/components/ThemedText";
import { FlatList, Image, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemeColors from "@/hooks/useThemeColors"; 
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { useFetchQuery, useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonId } from "@/functions/pokemon";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { Row } from "@/components/Row";

export default function Index() {
  const colors = useThemeColors();
  const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21')
  const [search, setSearch] = useState("")
  const pokemons = data?.pages.flatMap(page => page.results) ?? []
  const filteredPokemons = search ? pokemons.filter(p => p.name.includes(search.toLowerCase()) || getPokemonId(p.url).toString() === search) : pokemons
  return (
    <SafeAreaView style= {[styles.container, {backgroundColor: colors.primary}]}>
      <Row style={styles.header} gap={16}>
        <Image source={require("@/assets/images/Pokeball.png")} style={styles.pokeball} />
        <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
      </Row>
      <Row>
        <SearchBar value={search} onChange={setSearch} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          ListHeaderComponent={
            isFetching ? <ActivityIndicator color={colors.primary}/> : null
          }
          onEndReached={search ? undefined : () => fetchNextPage()}
          renderItem={({item}) => 
            <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3}}/>
          }
          keyExtractor={(item) => item.url}/>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 4  
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  body: {
    flex: 1,
    marginTop: 24
  },
  gridGap: {
    gap: 8
  },
  list: {
    padding: 12,
    paddingTop: 24
  },
  pokeball: {
    width: 24,
    height: 24,
    tintColor: '#FFF'
  }
})