import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {connect, useSelector} from 'react-redux';
import { Audio } from 'expo-av';
import Player from "./Player";

const PlayedRecently = ( ) => {
    const {playList ,playedRecently} = useSelector(state => state.reducer)

    return (
        <View>
            <Text>{"\n"}</Text>
            <Text>Played Recently:</Text>
            <Player songList={playedRecently} page={'list'} toggleFavorite={null}/>

        </View>
    );
};
export default PlayedRecently;
