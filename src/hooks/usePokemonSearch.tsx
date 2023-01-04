import { useEffect, useRef, useState } from 'react';
import { pokemonAPI } from '../api/pokemonAPI';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  // Lista de pokemons en el estado
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
  
  // 2.- Hace la petición de los pokemons
  const loadPokemons = async () => {
    // GET al valor del ref que es la URL
    const resp = await pokemonAPI.get<PokemonPaginatedResponse>( 'https://pokeapi.co/api/v2/pokemon?limit=1200' );  
    
    // Iteramos por cada pokemon en la lista
    mapPokemonList(resp.data.results);
  };

  // 3.- Los mapeamos y ya tnemos un array de pokemons
  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      // https://pokeapi.co/api/v2/pokemon/15/
      const urlParts = url.split('/'); // dividimos la url por '/' en un arreglo
      const id = urlParts[urlParts.length - 2]; // seleccionamos la penultima posición en el array
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      // retornamos estas tres propiedades de cada pokemon
      return { id, picture, name };
    });

    // Le añadimos a la lista simplePokemonList los nuevos pokemons integrados en el mismo array
    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  // 1.- Cuando carga la primera vez carga los pokemons
  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isFetching,
    simplePokemonList,
  };
};
