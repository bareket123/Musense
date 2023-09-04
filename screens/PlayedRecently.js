import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button, TextInput} from 'react-native';
import {Fontisto, MaterialCommunityIcons} from '@expo/vector-icons';
import {connect, useSelector} from 'react-redux';
import { Audio } from 'expo-av';
import Player from "./Player";
import  playedRecentlyStyle from '../styles/playedRecentlyStyle'

const PlayedRecently = ( ) => {
    const [searchSong,setSearchSong]=useState('');
    const {playedRecently} = useSelector(state => state.reducer)

    return (
        <View style={playedRecentlyStyle.backgroundView} >
            <Text style={playedRecentlyStyle.mainTitle}>Recently Played Songs:</Text>
            <View style={playedRecentlyStyle.searchView}>

                <TextInput
                    placeholder={'search watch history'}
                    value={searchSong}
                    onChangeText={setSearchSong}
                    style={playedRecentlyStyle.searchTextInput}

                />

            </View>


            <Player songList={playedRecently} page={'list'} toggleFavorite={null}/>
        </View>
    );
};
export default PlayedRecently;
