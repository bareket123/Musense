import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    ScrollView,
    SafeAreaView,
    FlatList,
    ImageBackground
} from 'react-native';
import   { useFonts } from 'expo-font';
import Player from "./Player";
import {X_RAPID_API_HOST, X_RAPID_API_KEY} from "../redux/actions";
import Logo from "./Logo"; // Import useSelector and useDispatch from react-redux
import * as SplashScreen from "expo-splash-screen";
import pic from "../images/musicBackGround.jpg";
import popularStyle from "../styles/popularStyle";

const PopularNow = () => {
    const [songsArray, setSongsArray] = useState([]); // Initialize songsArray as a state
    // const [fontsLoaded] = useFonts({
    //     'Anton-R': require('../assets/fonts/RammettoOne-Regular.ttf')
    // });
// useEffect(() => {
    //     if (fontsLoaded) {
    //         SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);

    // async function prepare() {
    //     await SplashScreen.preventAutoHideAsync();
    // }

    useEffect(() => {
        try {
        //   prepare();
            fetchPlaylist();
        } catch (error) {
            console.log("error in fetching " + error);
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
                    coverart:song.images.coverart,
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
           <View style={{backgroundColor:'black'}}>
            {/*<ImageBackground source={require('../images/popular.png')} >*/}
                <View style={{alignItems:'center',backgroundColor:'black'}} >
                    { (
                        <Text style={{ fontSize:30,color: 'white',
                            textShadowColor: 'rgba(255, 255, 255, 0.6)', // Change text shadow color to white with opacity
                            textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 4
                            }}>Hottest Hits of the Moment</Text>
                    )}
                </View>
                   {songsArray.length===0 && <Logo/>}
                   <Player songList={songsArray} page={'list'} toggleFavorite={toggleFavorite}/>
              </View>
             // </ImageBackground>
        );

}


export default PopularNow;
