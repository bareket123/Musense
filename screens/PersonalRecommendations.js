import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import {ScrollView}  from 'react-native-virtualized-view'
import Questionnaire from "./Questionnaire";
import axios from "axios";
import Player from "./Player";
import {LOCAL_SERVER_URL} from "../redux/actions";


const PersonalRecommendations = () => {
    const {token} = useSelector(state => state.reducer);
    const [allAnswers,setAllAnswers]=useState(null);
    const [playlistByGenre,setPlaylistByGenre]=useState([])
    const [artist1Playlist,setArtist1Playlist]=useState([])
    const [artist2Playlist,setArtist2Playlist]=useState([])
    const [listByFavorite,setListByFavorite]=useState([])
    const [combinedSongList, setCombinedSongList] = useState([]);
    const [questionnaireData, setQuestionnaireData] = useState(null);

    // Callback function to receive questionnaire data
    const handleQuestionnaireSubmit = (data) => {
        setQuestionnaireData(data);
    };
    useEffect(() => {
        if (playlistByGenre.length > 0 && artist1Playlist.length > 0 && artist2Playlist.length > 0 && listByFavorite.length > 0) {

            const combinedList = [...playlistByGenre, ...artist1Playlist, ...artist2Playlist, ...listByFavorite];
            const shuffleCombinedList=shuffleArray(combinedList)
            setCombinedSongList(shuffleCombinedList);
        }
    }, [playlistByGenre, artist1Playlist, artist2Playlist, listByFavorite]);


    useEffect(()=>{
        allAnswers===null&&
        getAnswers();


    },[questionnaireData,token])


    useEffect(()=>{
        getPlaylistByGenre();
        getArtist1Playlist();
        getArtist2Playlist();
        getFavoriteSong()
    },[allAnswers])


    const getAnswers =async () => {
        const response = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/get-user-preferences?token=' + token)
        if(response.data.success){
            setAllAnswers(response.data.userPreferences)


        }else {
            alert(response.data.errorCode)
            console.log(token)
        }
    }


    const getPlaylistByGenre=()=>{
        try {
            if (allAnswers!== null){
                console.log("inside")
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '77f4e88fbcmsh34c35cf21256c6ap1326abjsn36b18c917e58',
                        'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
                    }
                };

                fetch('https://shazam-api7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre?genre='+allAnswers.genre+'&limit=10', options)
                    .then(response => response.json())
                    .then(response => setSongs(response))
                    .catch(err => console.error("from genre "+ err));
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
                        'X-RapidAPI-Key': '5ce6d5700cmsh0a744fbf3438d5ep10c2eejsn280c47bdb245',
                        'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
                    }
                };
                fetch('https://shazam-api7.p.rapidapi.com/search?term='+allAnswers.artist1+'&limit=5', artist1Songs)
                    .then(response => response.json())
                    .then(response => setArtistSong(response.tracks.hits,1))
                    .catch(err => console.error("There is error in fetching data: "+err));
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
                        'X-RapidAPI-Key': '5ce6d5700cmsh0a744fbf3438d5ep10c2eejsn280c47bdb245',
                        'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
                    }
                }
                fetch('https://shazam-api7.p.rapidapi.com/search?term='+allAnswers.artist2+'&limit=5', artist2Songs)
                    .then(response => response.json())
                    .then(response => setArtistSong(response.tracks.hits,2))
                    .catch(err => console.error("There is error in fetching data: "+err));
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
                        'X-RapidAPI-Key': '5ce6d5700cmsh0a744fbf3438d5ep10c2eejsn280c47bdb245',
                        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                    }
                };

                fetch('https://shazam-api7.p.rapidapi.com/search?term='+allAnswers.favoriteSong+'&limit=5', favoriteSong)
                    .then(response => response.json())
                    .then(response => getByFavorite(response.tracks.hits[0].track.key))
                    .catch(err => console.error(err));
            }


        }catch (error) {
            console.log("error from fetch favorite song "+ error)
        }
    }
    const getByFavorite=async (songKey) => {

        if (allAnswers != null && songKey !== null) {
            console.log(songKey)
            const songList = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '77f4e88fbcmsh34c35cf21256c6ap1326abjsn36b18c917e58',
                    'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
                }
            };

            fetch('https://shazam-api7.p.rapidapi.com/songs/list-recommendations?id='+songKey+'&limit=10', songList)
                .then(response => response.json())
                .then(response => setRelatedSongList(response.tracks))
                .catch(err => console.error("error from favorite "+err));
        } else {
            console.log("song key is empty");
        }
    }

    const setRelatedSongList=(response)=>{
        let tempSongs=[];
        if (response!==undefined){
            response.map((song)=>{
                if (song!==undefined){
                    const currentSong = {
                        title: song.title!==undefined? song.title: '',
                        artist: song.subtitle!==undefined? song.subtitle:'',
                        url: song.hub?.actions[1]?.uri!==undefined?song.hub?.actions[1]?.uri : '',
                        coverImage: song.images?.background!==undefined? song.images.background :'',
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
        let tempArray=[]
       console.log("\n"+response+"\n")
        if (response!==undefined){
            response.map((song,index) => {
                const currentSong = {
                    songIndex: index,
                    title: song.heading.title!==undefined? song.heading.title: '',
                    artist: song.heading.subtitle!==undefined? song.heading.subtitle:'',
                    url: song.stores?.apple.previewurl!==undefined?song.stores?.apple.previewurl : '',
                    coverImage: song.images?.play!==undefined? song.images.play :'',


                };

                tempArray.push(currentSong);
                if (artist===1){
                    setArtist1Playlist(tempArray);
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
        if (response!==undefined){
            response.tracks.map((song, index) => {
                const currentSong = {
                    songIndex: index,
                    title: song.title,
                    artist: song.subtitle,
                    url: song.hub.actions[1].uri,
                    coverImage: song.images.background,


                };

                tempArray.push(currentSong);
            });

            setPlaylistByGenre(tempArray);
        }else {
            console.log("genre response is undefined")
        }


    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    return (


        <View>
            {
                allAnswers===null?
                    <Questionnaire onSubmit={handleQuestionnaireSubmit}/>
                    :
                    <View>
                        <Text>Your Personal Groove</Text>
                        <Player songList={combinedSongList} page={'list'} toggleFavorite={null}/>
                    </View>
            }


        </View>
    );
};

export default PersonalRecommendations;
