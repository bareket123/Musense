import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-gesture-handler';
import React, {useEffect, useState,createContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import PopularNow from './screens/PopularNow';
import PlayedRecently from './screens/PlayedRecently';
import MusicByArist from './screens/MusicByArtist';
import MusicByFriends from './screens/MusicByFriends';
import Login from './screens/Login'
import MyPlaylist from './screens/MyPlaylist';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import axios from "axios";
import { useContext, useReducer } from 'react';
import {GlobalStateContext, useGlobalState} from './screens/GlobalStateContext';


export default function App() {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [image,setImage]=useState('https://cdn-icons-png.flaticon.com/512/3271/3271191.png');
    const [token,setToken]=useState(null);
    const [myPlaylist,setMyPlaylist]=useState([]);


  const Stack = createStackNavigator();

    async function getUsername() {
        try {
            if (token !== null) {
                console.log("inside the get-username method ")
                let response = await axios.get('http://10.0.0.1:8989/get-user-details-by-token?token=' + token);
                if (response.data != null) {
                    setUsername(response.data.username);
                    setEmail(response.data.email)
                    if (response.data.picture!==""){
                        setImage(response.data.picture)
                    }

                    console.log("username is"+ image)
                } else {
                    console.log("response is null")
                }
            } else {
                console.log("the token is null")

            }


        }catch (error){
            console.log("error in the Home screen " ,error.message)
        }


    }
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setToken(token);
            console.log("token is: " + token);
        } catch (error) {
            console.log("error in the token Home screen ",error.message);
        }
    };
    useEffect(() => {
        getToken().then(r => {console.log("use effect worked")});
    });


    useEffect(  () => {
        getUsername().then(r => {console.log("use effect inside home screen")});
    })

    async function handleLout(){
   await AsyncStorage.removeItem('token')
        setUsername("guest")
        setEmail("")
        setImage('https://cdn-icons-png.flaticon.com/512/3271/3271191.png')
    console.log("delete")

  }const CustomDrawer = props => {
        return (
            <View style={{ flex: 1 }}>
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
                            <Text> Hello {username!=""?username:'guest'}</Text>
                        </View>
                        <Image
                            source={{
                                uri: image,
                            }}
                            style={{ width: 60, height: 60, borderRadius: 30 }}
                        />
                    </View>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        bottom: 50,
                        backgroundColor: '#f6f6f6',
                        padding: 20,
                    }}
                    onPress={handleLout}
                >
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
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
          {/*<Drawer.Screen component={HomeScreen} name={'home'}/>*/}
          {/*<Drawer.Screen component={PlayedRecently} name={'played'}/>*/}
          {/*  <Drawer.Screen name="Home" component={HomeScreen} options={{*/}
          {/*    headerTitle: () => (*/}
          {/*        <View style={styles.header}>*/}
          {/*          <TouchableOpacity style={styles.button} onPress={handleLout}>*/}
          {/*            <Text>Logout</Text>*/}
          {/*          </TouchableOpacity>*/}
          {/*          <View style={styles.iconContainer}>*/}
          {/*            <Ionicons name="ios-home" size={24} color="black" />*/}
          {/*          </View>*/}
          {/*        </View>*/}
          {/*    ),*/}
          {/*    headerTitleAlign: 'center',*/}
          {/*  }}*/}
          {/*  />*/}
         <Drawer.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name='Popular' component={PopularNow}/>
           <Stack.Screen name='artist' component={MusicByArist}/>
            <Stack.Screen name='friends' component={MusicByFriends}/>
            <Stack.Screen name='playlist' component={MyPlaylist}/>
            <Stack.Screen name='played' component={PlayedRecently}/>
            <Drawer.Screen name='login' component={Login}/>

        </Drawer.Navigator>


    )
  }

  return (
     <NavigationContainer>

         <DrawNavigator />

        {/*<Stack.Screen name="Home" component={HomeScreen} options={{*/}
        {/*  headerTitle: () => (*/}
        {/*      <View style={styles.header}>*/}
        {/*        <TouchableOpacity style={styles.button} onPress={handleLout}>*/}
        {/*          <Text>Logout</Text>*/}
        {/*        </TouchableOpacity>*/}
        {/*        <View style={styles.iconContainer}>*/}
        {/*          <Ionicons name="ios-home" size={24} color="black" />*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*  ),*/}
        {/*  headerTitleAlign: 'center',*/}
        {/*}}*/}
        {/*/>*/}
        {/*   <Stack.Screen name="Root" component={Root} />*/}
        {/*   <Stack.Screen name='Popular' component={PopularNow}/>*/}
        {/*<Stack.Screen name='played' component={PlayedRecently}/>*/}
        {/*<Stack.Screen name='artist' component={MusicByArist}/>*/}
        {/*<Stack.Screen name='friends' component={MusicByFriends}/>*/}
        {/*/!*<Stack.Screen name='playlist' component={MyPlaylist}/>*!/*/}
        {/*<Stack.Screen name='login' component={Login}/>*/}
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
