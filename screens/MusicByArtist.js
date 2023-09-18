import React, { useState} from 'react';
import {
    View,
    TextInput,
    Text,
    ImageBackground,

} from 'react-native';
import { Fontisto} from "@expo/vector-icons";
import { X_RAPID_API_HOST7, X_RAPID_API_KEY} from "../redux/actions";
import { useFocusEffect } from '@react-navigation/native';
import Player from "./Player";
import Logo from "./Logo";
import  musicByArtistStyle from '../styles/musicByArtistStyle'


export default function MusicByArtist () {

    const [currentArray,setCurrentArray]=useState([]);
    const [searchText, setSearchText] = useState("");
    const [showSongs, setShowSongs] = useState(false);
    const [isFoundSearch, setIsFoundSearch] = useState(true);


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
        if (response&&response?.tracks?.hits){
            response.tracks.hits.map((song,index) => {
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
            currentArray.map((song) =>{
                console.log(song)
            })
        }else {
            setIsFoundSearch(false)
        }

    }


    const search= ()=> {
        setIsFoundSearch(true)
        console.log("This is the user search "+searchText)
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
            .then(response => getAllSongByName(response))
             .catch(err => {setIsFoundSearch(false); console.log("there is error in search "+err)});
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
        <ImageBackground source={require('../images/searchArtist.gif')} style={musicByArtistStyle.background}>
            <View style={musicByArtistStyle.textTitle} >
                { (
                    <Text style={musicByArtistStyle.textHeader}>Search song or artist...</Text>
                )}
            </View>
            <View>
                <View style={musicByArtistStyle.searchStyle} >
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
                        {(currentArray.length===0&&isFoundSearch) &&<Logo/>}
                        {!isFoundSearch&&<Text style={{color:'white',fontSize:20 ,marginTop:30,alignSelf:'center'}}>Oops! Couldn't find what you're after. Give it another shot!</Text>}
                        {/*{currentArray.length > 0 && (                 //תנאי שרק אם יש שיר יופיע מסגרת*/}
                        {/*    <View style={musicByArtistStyle.cardContainer}>*/}
                        <Player songList={currentArray} page={'list'} toggleFavorite={toggleFavorite}/>
                        {/*</View>*/}
                        {/*)}*/}
                    </View>
                }
            </View>
        </ImageBackground>
    );
};
