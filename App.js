import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Provider, useSelector} from "react-redux";
import {Store} from "./redux/store"

import StackNav from "./screens/StackNav";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";



export default function App() {


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

