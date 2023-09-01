import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    ImageBackground,
    Button,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {AntDesign, FontAwesome, Fontisto} from "@expo/vector-icons";
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import {useContext} from "react";
import {setPlayedRecently, setPlaylist, X_RAPID_API_HOST, X_RAPID_API_HOST7, X_RAPID_API_KEY} from "../redux/actions";
import { useFocusEffect } from '@react-navigation/native';
import Player from "./Player";
import Logo from "./Logo";




export default function MusicByArtist ({ navigation }) {

    const [currentArray,setCurrentArray]=useState([]);
    const [searchText, setSearchText] = useState('');
    const [showSongs, setShowSongs] = useState(false);


    useFocusEffect(
        React.useCallback(() => {
            setShowSongs(false);
            setCurrentArray([]);

        }, [])
    );


    const handleSearch = (text) => {
        setSearchText(text);
    };


    function getAllSongByName(response) {
        let tempArray=[]
        response.map((song,index) => {
            const currentSong = {
                songIndex: index,
                title: song.heading.title!==undefined? song.heading.title: '',
                artist: song.heading.subtitle!==undefined? song.heading.subtitle:'',
                url: song.stores?.apple.previewurl!==undefined?song.stores?.apple.previewurl : '',
                coverImage: song.images?.play!==undefined? song.images.play :'',
                isFavorite: false,
            };

            tempArray.push(currentSong);
        });
        setCurrentArray(tempArray)
        currentArray.map((song,index) =>{
            console.log(song)
        })

    }


    const search= ()=> {
        console.log("this is the text "+searchText)
        setSearchText('');
        const songs = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': X_RAPID_API_KEY,
                'X-RapidAPI-Host': X_RAPID_API_HOST7
            }
        };

        fetch('https://shazam-api7.p.rapidapi.com/search?term='+searchText+'&limit=5', songs)
            .then(response => response.json())
            .then(response => getAllSongByName(response.tracks.hits))
            .catch(err => console.error("There is error in fetching data: "+err));
        setShowSongs(true);

        setSearchText('');
    }


    function toggleFavorite(index) {
        const updatedArray = currentArray.map((song, i) => {
            if (i === index) {
                return { ...song, isFavorite: !song.isFavorite };
            }
            return song;
        });
        setCurrentArray(updatedArray);
    }





    return (
        <View>
            <View style={styles.searchStyle} >

                <TextInput
                    placeholder="Search song or artist..."
                    onChangeText={handleSearch}
                    value={searchText}
                />
                <Fontisto name="search" onPress={search} size={20} color="black" />
            </View>
            {

                    showSongs&&
                <View>
                    {currentArray.length===0&& <Logo/>}
                    <Player songList={currentArray} page={'list'} toggleFavorite={toggleFavorite}/>
                    </View>



            }


        </View>


    );
};


const styles = StyleSheet.create({
    viewStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonExit: {
        backgroundColor: 'blue',
        borderRadius: 50,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 200,
        shadowColor: 'black',
        position: 'absolute',
        left: '30%',
        marginLeft: -50,
    },
    Button: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 200,
        shadowColor: 'black',
        position: 'absolute',
        left: '70%',
        marginLeft: -100,
    },
    buttonText: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold',
    },
    headerText: {
        justifyContent: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 50,
        color:'blue',
        shadowColor:'white'
    },
    textInput:{
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 60,
        width: 300,
        backgroundColor:'antiquewhite'
    },
    container: {
        flex: 1,
        backgroundColor:'pink',
        flexDirection:'row'

    },
    searchStyle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 40,

        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
    },

});


