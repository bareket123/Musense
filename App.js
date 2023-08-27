import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Provider, useSelector} from "react-redux";
import {Store} from "./redux/store"

import StackNav from "./screens/StackNav";
import {setToken, setUsername} from "./redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {

    useEffect(() => {
    const initializeApp = async () => {
        try {
            const tokenFromStorage = await AsyncStorage.getItem('token');
            const usernameFromStorage = await AsyncStorage.getItem('username');
            if (tokenFromStorage) {
                Store.dispatch(setToken(tokenFromStorage));
                Store.dispatch(setUsername(usernameFromStorage));
            }
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    };
    initializeApp().then(r => {});
}, []);

    return (

        <Provider store={Store} >
            <NavigationContainer>
                <StackNav/>
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

