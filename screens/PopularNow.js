import React, { useEffect, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import   { useFonts } from 'expo-font';
import Player from "./Player";
import {X_RAPID_API_HOST, X_RAPID_API_KEY} from "../redux/actions";
import Logo from "./Logo";
import * as SplashScreen from "expo-splash-screen";
import popularStyle from "../styles/popularStyle";
import globalStyles from "../styles/globalStyles";
import {SOMETHING_WENT_WRONG} from "../Utilities/Constans";
import ErrorAlert from "../Utilities/ErrorAlert";


const PopularNow = () => {
    const [songsArray, setSongsArray] = useState([]); // Initialize songsArray as a state
    const [messageCode, setMessageCode] = useState(0);
    const [fontsLoaded] = useFonts({
        'RammettoOne': require('../assets/Fonts/RammettoOne-Regular.ttf')
    });

    useEffect(() => {
        try {
         prepare();
            fetchPlaylist();
        } catch (error) {
            console.log("error in fetching " + error);
        }
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    async function prepare() {
        await SplashScreen.preventAutoHideAsync();
    }

        function getSong(response) {
            let tempArray = []
            if (response){
                response?.tracks.map((song, index) => {
                    const currentSong = {
                        songIndex: index,
                        title: song.title?song.title:'',
                        artist: song.subtitle?song.subtitle:'',
                        url: song?.hub?.actions[1]?.uri? song.hub.actions[1].uri:'',
                        coverImage: song?.images?.background?song.images.background:'',
                        isFavorite: false
                    };
                    tempArray.push(currentSong);
                });
                setSongsArray(tempArray)
            }else {
                console.log("Error from Popular,something wrong with fetching songs ")
                setMessageCode(SOMETHING_WENT_WRONG)
            }
        }

        const fetchPlaylist = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY,
                    'X-RapidAPI-Host': X_RAPID_API_HOST
                }
            };

            fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=10&startFrom=0', options)
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
            songsArray.length>0?
                <ImageBackground source={require('../images/popularNow.png')} resizeMode={'cover'} style={globalStyles.flexProp}  >
                    <View style={popularStyle.viewStyle}>
                        { (
                            fontsLoaded&&
                            <Text style={popularStyle.mainTitle}>Hottest Hits of the Moment</Text>
                        )}
                    </View>
                    <View style={globalStyles.flexProp}>
                    <Player songList={songsArray} page={'list'} toggleFavorite={toggleFavorite}/>
                   </View>
                </ImageBackground>
                :
                <View>
                    {
                        messageCode !== 0 &&
                        <ErrorAlert message={messageCode} />
                    }
                    <Logo/>
                </View>
        );
}

export default PopularNow;
