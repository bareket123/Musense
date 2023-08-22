import {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {useSelector} from "react-redux";


import Questionnaire from "./Questionnaire";
import axios from "axios";
import Player from "./Player";


const PersonalRecommendations = () => {
    const {token} = useSelector(state => state.reducer);
    const [allAnswers,setAllAnswers]=useState();
    const [playlistByGenre,setPlaylistByGenre]=useState([])
    const [artist1Playlist,setArtist1Playlist]=useState([])
    const [artist2Playlist,setArtist2Playlist]=useState([])
    const [artistPlaylist,setArtistPlaylist]=useState([])

    useEffect(()=>{
        getAnswers();
    },[token,allAnswers])

    const getAnswers =async () => {
        const response = await axios.create({baseURL: 'http://10.0.0.1:8989'}).get('/get-user-preferences?token=' + token)
        if(response.data.success){
           setAllAnswers(response.data.userPreferences)
        }
    }

    useEffect(()=>{
    getPlaylistByGenre();

    },[])

    // useEffect(()=>{
    //     getArtistsPlaylist();
    //
    // },[])

    const getPlaylistByGenre=()=>{
        if (allAnswers!== undefined){
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '38fefeb706mshdeefd590dcb5b1fp1a76bdjsn744bb3ebe44f',
                    'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
                }
            };

            fetch('https://shazam-api7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre?genre='+allAnswers.genre+'&limit=5', options)
                .then(response => response.json())
                .then(response => setSongs(response))
                .catch(err => console.error(err));

        }
    }
   // const getArtistsPlaylist=()=>{
   //      if (allAnswers!==undefined){
   //          const artist1Songs = {
   //              method: 'GET',
   //              headers: {
   //                  'X-RapidAPI-Key': '38fefeb706mshdeefd590dcb5b1fp1a76bdjsn744bb3ebe44f',
   //                  'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
   //              }
   //          };
   //
   //          fetch('https://shazam.p.rapidapi.com/search?term='+allAnswers.artist1+'&locale=en-US&offset=0&limit=5', artist1Songs)
   //              .then(response => response.json())
   //              .then(response => setArtistSong(response.tracks.hits,2))
   //              .catch(err => console.error("There is error in fetching data: "+err));
   //
   //          const artist2Songs = {
   //              method: 'GET',
   //              headers: {
   //                  'X-RapidAPI-Key': '38fefeb706mshdeefd590dcb5b1fp1a76bdjsn744bb3ebe44f',
   //                  'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
   //              }
   //          };
   //
   //          fetch('https://shazam.p.rapidapi.com/search?term='+allAnswers.artist2+'&locale=en-US&offset=0&limit=5', artist1Songs)
   //              .then(response => response.json())
   //              .then(response => setArtistSong(response.tracks.hits,2))
   //              .catch(err => console.error("There is error in fetching data: "+err));
   //      }
   //      }
   //   const setArtistSong=(response,artist)=>{
   //       let tempArray=[]
   //       response.map((song,index) => {
   //           const currentSong = {
   //               songIndex:index,
   //               title: song.track.title,
   //               artist: song.track.subtitle,
   //               url: song.track.hub.actions[1].uri,
   //               coverImage:song.track.images.background,
   //               isFavorite: false ///
   //
   //           };
   //
   //           tempArray.push(currentSong);
   //           if (artist===1){
   //               setArtist1Playlist(tempArray);
   //           }else {
   //               setArtist2Playlist(tempArray);
   //           }
   //       });
   //
   //
   //
   //   }

    const setSongs=(response)=>{
        let tempArray = []
        console.log(response)
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

    }


    return (
        <View>
            {
                // allAnswers!==undefined?
                //     <View>
                //         <Text style={{color:'black'}}>help us create the perfect playlist personalized just for you</Text>
                //         <Questionnaire/>
                //     </View>

                    <View>
                        {
                            playlistByGenre.length>0&&
                            <Player songList={playlistByGenre} page={'list'} toggleFavorite={null}/>
                        }
                    </View>
            }


        </View>
    );
};

export default PersonalRecommendations;
