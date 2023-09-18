import React, { useEffect, useState } from 'react';
import {View, Text, TextInput} from 'react-native';
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { useSelector} from 'react-redux';
import Player from "./Player";
import  playedRecentlyStyle from '../styles/playedRecentlyStyle'
import {LOCAL_SERVER_URL} from "../redux/actions";
import axios from "axios";
import globalStyles from "../styles/globalStyles";
import {DELETE} from "./Constans";
import ErrorAlert from "./ErrorAlert";


const PlayedRecently = ( ) => {
    const [searchSong, setSearchSong] = useState('');
    const {isPlaying,token } = useSelector(state => state.reducer);
    const [filterSongs, setFilterSongs] = useState([]);
    const [playedRecently, setPlayedRecently] = useState([]);
    const [messageCode,setMessageCode]=useState(0);

    useEffect(()=>{
        getPlayedRecently().then(()=>{})
    },[playedRecently,token])

    const getPlayedRecently = async () => {
        try {
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-played-recently?token=' + token);
            if (response.data.success) {
                setPlayedRecently(response.data.playedRecently)
            } else {
                console.log("not found playedRecently list, error code: "+response.data.errorCode)
            }


        } catch (error) {
            console.log("error getting playedRecently "+error)
        }
    }
    const deletePlayedRecently = async () => {
        setMessageCode(0)
        try {
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/delete-played-recently?token=' + token);
            if (response.data.success) {
                setMessageCode(DELETE)
            } else {
               setMessageCode(response.data.errorCode)
            }


        } catch (error) {
            console.log("error from delete playedRecently "+error)
        }

    }

    useEffect(() => {
        const filteredSongs = playedRecently.filter(song =>
            song.title.toLowerCase().startsWith(searchSong.toLowerCase())
        );
        setFilterSongs(filteredSongs);
    }, [searchSong, playedRecently]);


    return (
        <View style={playedRecentlyStyle.backgroundView} >
            <MaterialCommunityIcons name="delete-empty" size={50} color="white" style={{position:'absolute',right:0,bottom:playedRecently.length>0 ||filterSongs.length>0?556:0 }} disabled={playedRecently.length===0} onPress={deletePlayedRecently}  />
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
                <View style={{flexDirection:'column',flex:1}}>
                    <Text style={{color:'white', fontSize:30}}>
                        The song you're searching for was not found 😭
                    </Text>
                </View>

            }
            <View style={globalStyles.flexProp}>
                <Player songList={searchSong.length > 0 ? filterSongs : playedRecently} page={'recently'} toggleFavorite={null}/>

            </View>
            {
                (messageCode !== 0) &&
                <ErrorAlert message={messageCode} />
            }

        </View>
    );



}

export default PlayedRecently;
