import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView style={{ ...StyleSheet.absoluteFillObject }} showsVerticalScrollIndicator={false}>
      {/* Types and weight */}
      <View style={{ ...styles.container, marginTop: 370 }}>
        <Text style={styles.title}>Tipo</Text>
        <View style={{ flexDirection: 'row' }}>
          {pokemon.types.map(({ type }) => (
            <Text key={type.name} style={{ ...styles.regularText, marginRight: 10 }}>
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight}kg</Text>
      </View>

      {/* Sprites */}
      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
        <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
        <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
        <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
      </ScrollView>

      {/* Skills */}
      <View style={styles.container}>
        <Text style={styles.title}>Habilidades base</Text>
        <View style={{ flexDirection: 'row' }}>
          {pokemon.abilities.map(({ ability }) => (
            <Text key={ability.name} style={{ ...styles.regularText, marginRight: 10 }}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Moves */}
      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {pokemon.moves.map(({ move }) => (
            <Text key={move.name} style={{ ...styles.regularText, marginRight: 10 }}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.regularText, marginRight: 10, width: 150 }}>
                {stat.stat.name}
              </Text>
              <Text style={{ ...styles.regularText, fontWeight: 'bold' }}>{stat.base_stat}</Text>
            </View>
          ))}
        </View>

        {/* Sprite Final */}
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
        </View>
      </View>
    </ScrollView>
  ); 
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black'
  },
  regularText: {
    fontSize: 19,
    color: 'black'
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
