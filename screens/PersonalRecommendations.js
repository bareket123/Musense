import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import Questionnaire from "./Questionnaire";
import axios from "axios";
import Player from "./Player";
import {LOCAL_SERVER_URL, X_RAPID_API_HOST7, X_RAPID_API_KEY2} from "../redux/actions";
import Logo from "./Logo";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import recommendationsStyle from '../styles/personalRecommendationsStyle'
import globalStyles from "../styles/globalStyles";
import {FontAwesome} from "@expo/vector-icons";

const PersonalRecommendations = () => {
    const {token} = useSelector(state => state.reducer);
    const [allAnswers,setAllAnswers]=useState(null);
    const [playlistByGenre,setPlaylistByGenre]=useState([])
    const [artist1Playlist,setArtist1Playlist]=useState([])
    const [artist2Playlist,setArtist2Playlist]=useState([])
    const [listByFavorite,setListByFavorite]=useState([])
    const [combinedSongList, setCombinedSongList] = useState([]);
    const [questionnaireData, setQuestionnaireData] = useState(null);

    const [fontsLoaded] = useFonts({
        'loveYa': require('../assets/Fonts/LoveYaLikeASister-Regular.ttf'),

    });
    useEffect(()=>{
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    },[fontsLoaded])

    const handleQuestionnaireSubmit = (data) => {
        setQuestionnaireData(data);
    };
    useEffect(() => {
        if ((playlistByGenre.length > 0 || artist1Playlist.length > 0 || artist2Playlist.length > 0) || listByFavorite.length > 0) {
            const combinedList = [...playlistByGenre, ...artist1Playlist, ...artist2Playlist, ...listByFavorite];
            const shuffleCombinedList=shuffleArray(combinedList)
            setCombinedSongList(shuffleCombinedList);
        }
    }, [playlistByGenre, artist1Playlist, artist2Playlist, listByFavorite]);


    useEffect(()=>{
        getAnswers().then(() => {});


    },[questionnaireData,token])


    useEffect(()=>{
        getPlaylistByGenre();
        getArtist1Playlist();
        getArtist2Playlist();
        const timeoutId = setTimeout(() => {
            getFavoriteSong()
        }, 5000);
        setTimeout(() => {
            clearTimeout(timeoutId);
        }, 5000);

    },[allAnswers])


    const getAnswers =async () => {
        try {
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/get-user-preferences?token=' + token)
            if(response.data.success){
                setAllAnswers(response.data.userPreferences)
            }else {
                console.log("not found answers: "+response.data.errorCode)
            }
        }catch (error){
            console.log("error getting answers from server: "+error )
        }

    }


    const getPlaylistByGenre=()=>{
        try {
            if (allAnswers!== null){
                console.log("inside")
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': X_RAPID_API_KEY2,
                        'X-RapidAPI-Host': X_RAPID_API_HOST7,
                    }
                };

                fetch('https://shazam-api7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre?genre='+allAnswers.genre+'&limit=10', options)
                    .then(response => response.json())
                    .then(response =>setSongs(response))
                    .catch(err => console.log("from genre "+ err));
            }
        }catch (error){
            console.log("error from playlist by genre "+ error);
        }

    }
    const getArtist1Playlist=()=>{

        try {
            if (allAnswers!==null){
                const artist1Songs = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': X_RAPID_API_KEY2,
                        'X-RapidAPI-Host': X_RAPID_API_HOST7,
                    }
                };
                fetch('https://shazam-api7.p.rapidapi.com/search?term='+allAnswers.artist1+'&limit=5', artist1Songs)
                    .then((response) => {
                        if (response.status === 500 || response.status===404) {
                            console.log('Internal server error. Please try again later.');
                            alert('we sorry, but we couldn\'t find the artist you were searching for. You can try rephrasing your query for better results')
                        }
                        return response.json();
                    })
                    .then(response => setArtistSong(response,1))
                    .catch(err => console.log("There is error in fetching data: "+err));
            }
        }catch (error){
            console.log("error fetching artist "+ error)
        }

    }
    const getArtist2Playlist=()=>{
        try {
            if (allAnswers!==null){
                const artist2Songs = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': X_RAPID_API_KEY2,
                        'X-RapidAPI-Host': X_RAPID_API_HOST7,
                    }
                }
                fetch('https://shazam-api7.p.rapidapi.com/search?term='+allAnswers.artist2+'&limit=5', artist2Songs)
                    .then((response) => {
                        if (response.status === 500 || response.status===404) {
                            console.log('Internal server error. Please try again later.');
                            alert('we sorry, but we couldn\'t find the artist you were searching for. You can try rephrasing your query for better results')
                        }
                        return response.json();
                    })
                    .then(response => setArtistSong(response,2))
                    .catch(err => console.log("There is error in Artist fetching data: "+err));
            }

        }catch (error){
            console.log("error from fetching artist2 " +error);
        }
    }
    const getFavoriteSong=()=>{

        try {
            if (allAnswers!=null){
                const favoriteSong = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': X_RAPID_API_KEY2,
                        'X-RapidAPI-Host': X_RAPID_API_HOST7,
                    }
                };

                fetch('https://shazam-api7.p.rapidapi.com/search?term='+allAnswers.favoriteSong+'&limit=5', favoriteSong)
                    .then((response) => {
                        if (response.status === 500 || response.status===404) {
                           console.log('Internal server error. Please try again later.');
                           alert('we sorry, but we couldn\'t find the song you were searching for. You can try rephrasing your query for better results')
                        }
                        return response.json();
                    })
                    .then(response => getByFavorite(response?.tracks?.hits[0]?.key))
                    .catch(err => console.log("there is error in favoriteSong "+err));
            }


        }catch (error) {
            console.log("error from fetch favorite song "+ error)
        }
    }
    const getByFavorite=async (songKey) => {
        console.log(songKey)
        if (allAnswers != null && songKey) {
            console.log(songKey)
            const songList = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY2,
                    'X-RapidAPI-Host': X_RAPID_API_HOST7,
                }
            };

            fetch('https://shazam-api7.p.rapidapi.com/songs/list-recommendations?id='+songKey+'&limit=5', songList)
                .then(response => response.json())
                .then(response => setRelatedSongList(response))
                .catch(err => console.log("error from favorite "+err));
        } else {
            console.log("song key is empty");
        }
    }

    const setRelatedSongList=(response)=>{
        let tempSongs=[];
        if (response&&response.tracks){
            response.tracks.map((song,index)=>{
                if (song!==undefined){
                    const currentSong = {
                        songIndex:index,
                        title: song.title? song.title: '',
                        artist: song.subtitle? song.subtitle:'',
                        url: song.hub?.actions[1]?.uri?song.hub?.actions[1]?.uri : '',
                        coverImage: song?.images?.background? song.images.background :'',
                        isFavorite:false
                    };
                    tempSongs.push(currentSong);
                }





            })
            setListByFavorite(tempSongs)
        }else {
            console.log("favorite response is undefined")
        }

    }


    const setArtistSong=(response,artist)=>{
       // console.log(response.tracks)
        let tempArray=[]

            if ( response&&response.tracks.hits){
                response.tracks.hits.map((song,index) => {
                    const currentSong = {
                        songIndex: index,
                        title: song?.heading?.title? song.heading.title: '',
                        artist: song?.heading?.subtitle? song.heading.subtitle:'',
                        url: song?.stores?.apple?.previewurl?song.stores?.apple.previewurl : '',
                        coverImage: song?.images?.play? song.images.play :'',
                        isFavorite:false


                    };

                    tempArray.push(currentSong);
                    if (artist===1){
                        setArtist1Playlist(tempArray);
                        // console.log(artist1Playlist)
                    }else {
                        setArtist2Playlist(tempArray);

                    }

                });
            }else {
                console.log("response is undefined")
            }




    }



    const setSongs=(response)=>{
        let tempArray = []
        if (response && response.tracks){
            response.tracks.map((song, index) => {
                if (song){
                    const currentSong = {
                        songIndex: index,
                        title: song.title,
                        artist: song.subtitle,
                        url: song.hub.actions[1].uri,
                        coverImage: song.images.background,
                        isFavorite:false



                    };

                    tempArray.push(currentSong);
                }
            });

            setPlaylistByGenre(tempArray);
        }else {
            console.log("Genre response is undefined ")
        }


    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function toggleFavorite(index) {
        const updatedArray = combinedSongList.map((song, i) => {
            if (i === index) {
                return { ...song, isFavorite: !song.isFavorite };
            }
            return song;
        });
        setCombinedSongList(updatedArray);
    }

    const deleteAnswers = async () => {
        try {
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/delete-answers?token=' + token)
            if (response.data.success) {
              alert('Delete')
              setAllAnswers(null)
                setCombinedSongList([])

            } else {
                console.log("something went wrong: " + response.data.errorCode)
            }
        } catch (error) {
            console.log("error delete answers from server: " + error)
        }

    }




    return (
        <View style={globalStyles.flexProp}>
        {
            allAnswers===null?
            <Questionnaire onSubmit={handleQuestionnaireSubmit}/>
            :
            combinedSongList.length>0?

                <ImageBackground source={require('../images/recommendationsBackground.gif')} resizeMode={'cover'} style={globalStyles.flexProp} >

                    <View style={globalStyles.flexProp}>

                        {
                            fontsLoaded&&
                            <Text style={recommendationsStyle.mainTitle}>Your Personal Groove</Text>
                        }
                        <TouchableOpacity style={recommendationsStyle.buttonStyle} onPress={deleteAnswers}>
                            <FontAwesome name="refresh" size={24} color="white" />
                            <Text style={recommendationsStyle.modifyButton}>Modify</Text>
                        </TouchableOpacity>
                        <View style={globalStyles.flexProp}>
                            <Player songList={combinedSongList} page={'list'} toggleFavorite={toggleFavorite}/>

                        </View>
                    </View>



                </ImageBackground>

                :
                <Logo/>
        }
</View>

    );
};

export default PersonalRecommendations;
