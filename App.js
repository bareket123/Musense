import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PopularNow from './screens/PopularNow';
import PlayedRecently from './screens/PlayedRecently';
import MusicByArist from './screens/MusicByArtist';
import MusicByFriends from './screens/MusicByFriends';
import MyPlaylist from './screens/MyPlaylist';
import { Ionicons } from '@expo/vector-icons';


export default function App() {
  const Stack = createStackNavigator();
  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerTitle: () => (
              <>
                <Ionicons name="ios-home" size={24} color="black" />

              </>
          ),
          headerTitleAlign: 'center',
        }}
        />
        <Stack.Screen name='Popular' component={PopularNow}/>
        <Stack.Screen name='played' component={PlayedRecently}/>
        <Stack.Screen name='artist' component={MusicByArist}/>
        <Stack.Screen name='friends' component={MusicByFriends}/>
        <Stack.Screen name='playlist' component={MyPlaylist}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
