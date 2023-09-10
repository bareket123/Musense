import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Image, ImageBackground
} from 'react-native';
import axios from "axios";
import {useSelector} from "react-redux";
import Player from "./Player";
import {LOCAL_SERVER_URL} from "../redux/actions";
import ErrorAlert from "./ErrorAlert";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {FontAwesome} from "@expo/vector-icons";
import  musicByFriendsStyle from '../styles/musicByFriendsStyle'
import globalStyles from "../styles/globalStyles";

export default function MusicByFriends ({ navigation }) {
    const [playlistByFriends,setPlaylistByFriends]=useState([]);
    const {token} = useSelector(state => state.reducer);
    const[messageCode, setMessageCode] = useState(0);

    const [fontsLoaded] = useFonts({
        'RammettoOne': require('../assets/Fonts/RammettoOne-Regular.ttf')
    });
    useEffect(() => {
        try {
            prepare();
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
    const getPlaylistByFriends=async ()=> {
        try {
            if (token !== null) {
                const response = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/get-friends-playlist?token=' + token);
                if (response.data.success) {
                    setPlaylistByFriends(response.data.playlistByFriends);
                } else {
                    setMessageCode(response.data.errorCode)
                }
            } else {
                console.log(" friends: token is empty")
            }
            setMessageCode(0);

        } catch (error) {
            console.log("error getting friends playlist " + error)
        }
    }


    useEffect(()=>{
        getPlaylistByFriends().then(r => {})
    })

    function toggleFavorite(id) {

        const updatedArray = playlistByFriends.map((song, i) => {
            if (song.id === id) {
                return {...song, isFavorite: !song.isFavorite};
            }
            return song;
        });
        setPlaylistByFriends(updatedArray);
    }





    return (
        <ImageBackground source={require('../images/musicByFriends.png')} style={globalStyles.flexProp} resizeMode={'cover'} >
    {
        playlistByFriends.length > 0 ?
            <View style={globalStyles.flexProp}>
                <View style={globalStyles.flexProp}>
                    {fontsLoaded && (
                        <Text style={musicByFriendsStyle.mainTitle}>Friendship in Music</Text>
                    )}
                    <Text style={musicByFriendsStyle.subtitle}>
                        listening to songs your friends love
                    </Text>
                    <View style={globalStyles.flexProp}>
                        <Player songList={playlistByFriends} page={'playlistFriends'} toggleFavorite={toggleFavorite}/>
                    </View>
                </View>
            </View>
            :
            <View>
                <Text style={musicByFriendsStyle.noFriendsText}>Looks like no one has added any songs yet 😧 </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Search friends')}}>
                    <Text style={musicByFriendsStyle.buttonText}>Press here to find more friends</Text>
                    <FontAwesome name="arrow-left" size={50} color="white" style={{alignSelf:'center'}} />
                </TouchableOpacity>

            </View>

    }
           {
               messageCode!==0&&
               <ErrorAlert message={messageCode}/>
           }


        </ImageBackground>
    );
};




