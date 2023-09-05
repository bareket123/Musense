import  { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button, TextInput, TouchableHighlight} from 'react-native';
import {Fontisto, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {connect, useDispatch, useSelector} from 'react-redux';
import { Audio } from 'expo-av';
import Player from "./Player";
import  playedRecentlyStyle from '../styles/playedRecentlyStyle'
import {deletePlayedRecently} from "../redux/actions";


const PlayedRecently = ( ) => {
    const dispatch=useDispatch()
    const [searchSong, setSearchSong] = useState('');
    const { playedRecently,isPlaying } = useSelector(state => state.reducer);
    const [filterSongs, setFilterSongs] = useState([]);

    useEffect(() => {
        const filteredSongs = playedRecently.filter(song =>
            song.title.toLowerCase().startsWith(searchSong.toLowerCase())
        );
        setFilterSongs(filteredSongs);
    }, [searchSong, playedRecently]);


    return (
        <View style={playedRecentlyStyle.backgroundView} >
            <MaterialCommunityIcons name="delete-empty" size={50} color="white" style={{position:'absolute',right:0,bottom:playedRecently.length>0 ||filterSongs.length>0?556:0 }} onPress={()=>{dispatch(deletePlayedRecently())}}  />
            <Text style={playedRecentlyStyle.mainTitle}>Recently Played Songs:</Text>
            {
                !isPlaying&&
                <View style={playedRecentlyStyle.searchView}>
                    {searchSong.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={24}
                            color="grey"
                            style={playedRecentlyStyle.clear}
                            onPress={() => setSearchSong('')}
                        />
                    )}
                    <TextInput
                        placeholder={' search watch history  🔎'}
                        value={searchSong}
                        onChangeText={setSearchSong}
                        placeholderTextColor={'black'}
                        maxLength={10}
                        style={playedRecentlyStyle.searchTextInput}

                    />
                </View>

            }
            {
                (filterSongs.length===0&& playedRecently.length>0)&&
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'white', fontSize:30}}>
                       The song you're searching for was not found 😭
                    </Text>
                </View>

            }
            <Player songList={searchSong.length > 0 ? filterSongs : playedRecently} page={'recently'} toggleFavorite={null}/>

        </View>
    );



}

export default PlayedRecently;
