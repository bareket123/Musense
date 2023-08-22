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
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.SafeAreaView}>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Popular')}}>
                        <Image source={require('../images/popular.gif')} style={styles.image}  resizeMode="cover"
                        />
                        <Text style={styles.caption}>Popular Music</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('played')}}>
                        <Image source={require('../images/playrecently.gif')} style={styles.image}/>
                        <Text style={styles.caption}>Played Recently</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('artist')}}>
                        <Image source={require('../images/music.png')} style={styles.image}/>
                        <Text style={styles.caption}> Music by Artist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('friends')}}>
                        <Image source={require('../images/friends.gif')} style={styles.image}/>
                        <Text style={styles.caption}>Played Music by Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('playlist')}}>
                        <Image source={require('../images/playlist2.gif')} style={styles.image}/>
                        <Text style={styles.caption}>my playlist</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
    },
    SafeAreaView:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    TouchableOpacity: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
    },
    caption: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 5,
        fontSize: 20,
    },
    header:{
        position: 'absolute',
        right:150,
        fontSize: 16,
        fontWeight: 'bold',
        color:'white',
        shadowColor:'green'
    },
    loginButton:{
        left:100,
        backgroundColor:'green',
    },
    linearGradient: {
        left:100,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 60
    },
    buttonText3: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default HomeScreen;
