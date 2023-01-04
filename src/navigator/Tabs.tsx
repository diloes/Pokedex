import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigator } from './Navigator';
import { SearchScreen } from '../screens/SearchScreen';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={{
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: ( Platform.OS === 'ios' ) ? 0 : 10
        },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.87)',
          borderWidth: 0,
          elevation: 0,
          height: ( Platform.OS === 'ios' ) ? 80 : 60
        }
      }}
    >
      <Tab.Screen 
        name="Navigator" 
        component={ Navigator } // Navigator incluye HomeScreen y PokemonScreen
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({ color }) => <Icon color={color} size={20} name='list-outline' />
        }}
      />
      <Tab.Screen 
        name="SearchScreen" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color }) => <Icon color={color} size={20} name='search-outline' />
        }}
      />
    </Tab.Navigator>
  );
}