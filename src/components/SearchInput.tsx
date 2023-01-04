import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
  style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style }: Props) => {
  return (
    <View style={{...styles.container, ...style as any}}>
      <View style={styles.textBackground}>
        <TextInput 
          placeholder='Buscar Pokemon'
          style={styles.textInput}
          autoCapitalize='none'
          autoCorrect={false}
          placeholderTextColor='grey'
        />

        <Icon name='search-outline' color='grey' size={30} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 45,
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    
  }
})