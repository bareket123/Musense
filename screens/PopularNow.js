import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button, ScrollView, SafeAreaView, FlatList} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign} from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import {setPlayedRecently, setPlaylist} from "../redux/actions";
import axios from "axios";
import Player from "./Player"; // Import useSelector and useDispatch from react-redux
// import { addToPlayedRecently } from '../actions/actions'; // Import your action creator


const PopularNow = () => {
    const [songsArray, setSongsArray] = useState([]); // Initialize songsArray as a state

    // Assume you fetch songs and update the songsArray here
    useEffect(() => {
        // Fetch songs from API and update the songsArray state
        const fetchedSongs = []; // Fetch songs from API
        setSongsArray(fetchedSongs);
    }, []);


        useEffect(() => {
            fetchPlaylist();
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
                    'X-RapidAPI-Key': '6fda77ecacmshe3aac4f5a1a2d76p1dfc45jsnfc5a2e71d25a',
                    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
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
