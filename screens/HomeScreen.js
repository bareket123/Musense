import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, TouchableOpacity, Text, StyleSheet, Image,View} from 'react-native';
import { FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchFriends from "./SearchFriends";
import MyFriends from "./MyFriends";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setToken} from "../redux/actions";
import {useDispatch} from "react-redux";
import  homeStyle from '../styles/homeStyle'


const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch(); // Get the dispatch function
    const [username,setUsername]=useState("");
    const homeName="home";
    const loginName="login";
    const popularName="popular";

    const Tab=createBottomTabNavigator();

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== undefined) {
                dispatch(setToken(token));
            }

        } catch (error) {
            console.log("error while save a token "+ error)
        }

    }
    useEffect(  () => {

        getToken().then(r => {console.log("save the token in state")});

    },[])

    return (
        <ScrollView style={homeStyle.container}>
            <SafeAreaView>
                <View style={homeStyle.SafeAreaView}>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Popular')}}>
                        <Image source={require('../images/popular.gif')} style={homeStyle.image}  resizeMode="cover"
                        />
                        <Text style={homeStyle.caption}>Popular Music</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('played')}}>
                        <Image source={require('../images/playrecently.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>Played Recently</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('artist')}}>
                        <Image source={require('../images/music.png')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}> Music by Artist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('friends')}}>
                        <Image source={require('../images/friends.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>Played Music by Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('playlist')}}>
                        <Image source={require('../images/playlist2.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>my playlist</Text>
                    </TouchableOpacity>
                </View>

                <NavigationContainer independent={true}>
                    <Tab.Navigator

                        screenOptions={{
                            tabBarStyle: [
                                {
                                    display: 'flex',
                                    backgroundColor:'black'
                                },
                                null,
                            ],
                        }}>
                        <Tab.Screen
                            name="Search Friends"
                            component={SearchFriends}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialIcons
                                        name="person-search"
                                        style={{ left: 0, justifyContent: 'space-around', backgroundColor: 'black' }}
                                        size={size}
                                        color='white'
                                        onPress={() => { navigation.navigate('Search Friends') }}
                                    />
                                ),
                            }}
                        />

                        <Tab.Screen
                            name="My Friends"
                            component={MyFriends}
                            options={{
                                tabBarIcon: ({ color, size,style }) => (
                                    <FontAwesome5 name="user-friends"
                                                  size={24}
                                                  color="white"
                                                  onPress={() => { navigation.navigate('My Friends') }} />   ),
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </ScrollView>
    );
};


export default HomeScreen;
