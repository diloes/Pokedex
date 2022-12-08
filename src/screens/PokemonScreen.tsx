import React from 'react';

import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { simplePokemon, color } = route.params;
  const { id, name, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();

  const { isLoading, pokemon } = usePokemon(id);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        {/* Back Button */}
        <TouchableOpacity
          style={{ ...styles.backButton, top: top + 5 }}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        {/* Pokemon name */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 40,
          }}>
          {name + '\n'}#{id}
        </Text>

        {/* Pokeball white */}
        <Image source={require('../assets/pokebola-blanca.png')} style={styles.pokeball} />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {/* Detalles y loading */}
      <View style={styles.loadingIndicator}>
        <ActivityIndicator color={color} size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
