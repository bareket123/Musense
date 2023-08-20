import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, TouchableOpacity, View,ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import React, { useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PopularNow from './screens/PopularNow';
import PlayedRecently from './screens/PlayedRecently';
import MusicByArist from './screens/MusicByArtist';
import MusicByFriends from './screens/MusicByFriends';
import Login from './screens/Login'
import MyPlaylist from './screens/MyPlaylist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Provider} from "react-redux";
import {Store} from "./redux/store"
import SearchFriends from "./screens/SearchFriends";
import MyFriends from "./screens/MyFriends";


export default function App() {


    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [image,setImage]=useState('https://cdn-icons-png.flaticon.com/512/3271/3271191.png');
    const Stack = createStackNavigator();


    async function handleLout(){
        await AsyncStorage.removeItem('token')
        setUsername("guest")
        setEmail("")
        setImage('https://cdn-icons-png.flaticon.com/512/3271/3271191.png')
        console.log("delete")
    }

    const CustomDrawer = props => {
        return (
            <ScrollView style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 20,
                            backgroundColor: '#f6f6f6',
                            marginBottom: 20,
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 18 }}>Hello {username !== '' ? username : 'guest'}</Text>
                        </View>
                        <Image
                            source={{
                                uri: image,
                            }}
                            style={{ width: 60, height: 60, borderRadius: 30 }}
                        />
                    </View>
                    <DrawerItemList {...props} />
                    <TouchableOpacity
                        style={{
                            bottom: 0,
                            width: '100%',
                            backgroundColor: '#f6f6f6',
                            padding: 20,
                            borderTopWidth: 1,
                            borderTopColor: '#ddd',
                        }}
                        onPress={handleLout}
                    >
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </DrawerContentScrollView>
            </ScrollView>
        );
    };

    const Drawer=createDrawerNavigator();
    const DrawNavigator=()=>{
        return(
            <Drawer.Navigator screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitle: '',
            }}
                              drawerContent={props => <CustomDrawer {...props} />} >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name='login' component={Login}/>
                <Stack.Screen name='Popular' component={PopularNow}/>
                <Stack.Screen name='artist' component={MusicByArist}/>
                <Stack.Screen name='friends' component={MusicByFriends}/>
                <Stack.Screen name='playlist' component={MyPlaylist}/>
                <Stack.Screen name='played' component={PlayedRecently}/>
                <Stack.Screen name='My Friends' component={MyFriends}/>
                <Stack.Screen name='Search Friends' component={SearchFriends}/>
            </Drawer.Navigator>
        )
    }

    return (
        <Provider store={Store} >
            <NavigationContainer>
                <DrawNavigator />
            </NavigationContainer>
        </Provider>
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
        transform: [{ translateX: -11 }],
    },
});

