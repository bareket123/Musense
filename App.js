import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,TouchableOpacity,View} from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PopularNow from './screens/PopularNow';
import PlayedRecently from './screens/PlayedRecently';
import MusicByArist from './screens/MusicByArtist';
import MusicByFriends from './screens/MusicByFriends';
import Login from './screens/Login'
import MyPlaylist from './screens/MyPlaylist';
import { Ionicons } from '@expo/vector-icons';



export default function App() {
  const Stack = createStackNavigator();
  let handleLogout;
  function handleLout(){

  }
  return (

     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerTitle: () => (
              <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                  <Text>Logout</Text>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                  <Ionicons name="ios-home" size={24} color="black" />
                </View>
              </View>
          ),
          headerTitleAlign: 'center',
        }}
        />
        <Stack.Screen name='Popular' component={PopularNow}/>
        <Stack.Screen name='played' component={PlayedRecently}/>
        <Stack.Screen name='artist' component={MusicByArist}/>
        <Stack.Screen name='friends' component={MusicByFriends}/>
        <Stack.Screen name='playlist' component={MyPlaylist}/>
        <Stack.Screen name='login' component={Login}/>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    left: 100,
  },
  iconContainer: {
    position: 'absolute',
    left: '100%',
    transform: [{ translateX: -12 }],
  },
});
