import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from "axios";
import Player from "./Player";
import { LOCAL_SERVER_URL } from "../redux/actions";
import ErrorAlert from "./ErrorAlert";
import myPlaylistStyle from '../styles/myPlaylistStyle';
import globalStyles from "../styles/globalStyles";

export default function MyPlaylist({ navigation }) {
    const { token } = useSelector(state => state.reducer);
    const [myPlaylist, setMyPlaylist] = useState([]);
    const [messageCode, setMessageCode] = useState(0);

    const getPlaylist = async () => {
        try {
            const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/get-playlist?token=' + token);
            if (response.data.success) {
                setMyPlaylist(response.data.playlist);
            } else {
                setMessageCode(response.data.errorCode);
            }
            setMessageCode(0);
        }catch (error){
            console.log("error getting playlist "+error)
        }

    }

    useEffect(() => {
        getPlaylist();
    }, [myPlaylist])

    return (
        <ImageBackground source={require('../images/myPlaylist.jpg')} resizeMode={'cover'} style={globalStyles.flexProp} >
                <View style={globalStyles.flexProp}>
                    {myPlaylist.length > 0 && (
                        <View style={myPlaylistStyle.textTitle}>
                            <Text style={myPlaylistStyle.textHeader}>My Playlist:</Text>
                        </View>
                    )}
                    {myPlaylist.length > 0 ? (
                            <View style={globalStyles.flexProp}>
                                <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null} />
                            </View>

                    ) : (
                        <View>
                            <Text style={myPlaylistStyle.noPlaylist}>
                                You haven't added songs
                            </Text>
                            <View style={myPlaylistStyle.customButton}>
                                <TouchableOpacity onPress={() => { navigation.navigate('Popular') }}>
                                    <Text style={myPlaylistStyle.buttonText}>Go search for more songs</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {messageCode !== 0 && <ErrorAlert message={messageCode} />}
                </View>

        </ImageBackground>
    );
}


