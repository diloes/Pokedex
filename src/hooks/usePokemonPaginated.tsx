import { useEffect, useRef, useState } from 'react';
import { pokemonAPI } from '../api/pokemonAPI';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Lista de pokemons en el estado
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
  // Almacenamos la url en un useRef
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  // Función que hace la petición a la API
  const loadPokemons = async () => {
    setIsLoading(true);
    // GET al valor del ref que es la URL
    const resp = await pokemonAPI.get<PokemonPaginatedResponse>(nextPageUrl.current);
    // Utilizamos la opción next que nos da la API para pasar a los siguientes pokemons
    nextPageUrl.current = resp.data.next;
    // Iteramos por cada pokemon en la lista
    mapPokemonList(resp.data.results);
  };

  // Función que itera la lista de pokemons
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
    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    simplePokemonList,
    loadPokemons,
  };
};
