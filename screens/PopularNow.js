import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button, ScrollView, SafeAreaView, FlatList} from 'react-native';

import Player from "./Player";
import {X_RAPID_API_HOST, X_RAPID_API_KEY} from "../redux/actions"; // Import useSelector and useDispatch from react-redux

const PopularNow = () => {
    const [songsArray, setSongsArray] = useState([]); // Initialize songsArray as a state



    useEffect(() => {
        try {
            fetchPlaylist();
        }catch (error){
            console.log("error in fetching "+ error)
        }


        }, []);

        function getSong(response) {
            let tempArray = []
            response.tracks.map((song, index) => {
                const currentSong = {
                    songIndex: index,
                    title: song.title,
                    artist: song.subtitle,
                    url: song.hub.actions[1].uri,
                    coverImage: song.images.background,
                    isFavorite: false // Initialize as not favorite//////////////////////////////////

                };

                tempArray.push(currentSong);
            });

            setSongsArray(tempArray)

        }


        const fetchPlaylist = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY,
                    'X-RapidAPI-Host': X_RAPID_API_HOST
                }
            };

            fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0', options)
                .then(response => response.json())
                .then(response => getSong(response))
                .catch(err =>  console.error(err));
        }


        function toggleFavorite(index) {

            const updatedArray = songsArray.map((song, i) => {
                if (i === index) {
                    return {...song, isFavorite: !song.isFavorite};
                }
                return song;
            });
            setSongsArray(updatedArray);
        }


        return (

            <View style={styles.container}>
                <View>
                   <Player songList={songsArray} page={'list'} toggleFavorite={toggleFavorite}/>
                </View>
            </View>
        );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'pink'
    },
    playButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    playButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    SafeAreaView:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default PopularNow;
