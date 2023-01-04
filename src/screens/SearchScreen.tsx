import { Dimensions, FlatList, Platform, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SearchInput } from '../components/SearchInput'
import { usePokemonSearch } from '../hooks/usePokemonSearch'
import { styles } from '../theme/appTheme'
import { PokemonCard } from '../components/PokemonCard'
import { Loading } from '../components/Loading'

const screenWidth = Dimensions.get('window').width

export const SearchScreen = () => {
  
  const { top } = useSafeAreaInsets() // Para saber el espacio que hay en el notch
  const { isFetching, simplePokemonList } = usePokemonSearch()

  if( isFetching ){
    return <Loading />
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>

      <SearchInput 
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: ( Platform.OS === 'ios' ) ? top : top + 20
        }}
      />

      <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}

          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                marginTop: ( Platform.OS === 'ios' ) ? top + 65 : top + 85
              }}>
              Pokedex
            </Text>
          }
          
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
        />
    </View>
  )
}
