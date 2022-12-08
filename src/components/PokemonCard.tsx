import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageColors from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const { navigate } = useNavigation<StackNavigationProp<RootStackParams>>();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, { fallback: 'grey' }).then(colors => {
      if (!isMounted.current) return;

      colors.platform === 'ios'
        ? setBgColor(colors.background || 'grey')
        : setBgColor(colors.dominant || 'grey');
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor })}>
      <View style={{ ...styles.cardContainer, width: windowWidth * 0.4, backgroundColor: bgColor }}>
        {/* Nombre del Pokemon y ID */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image source={require('../assets/pokebola-blanca.png')} style={styles.pokebola} />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
