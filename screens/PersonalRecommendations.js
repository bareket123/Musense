import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import { ScrollView } from 'react-native-virtualized-view'



import Questionnaire from "./Questionnaire";
import axios from "axios";
import Player from "./Player";
import {useFocusEffect} from "@react-navigation/native";


const PersonalRecommendations = ({onSubmit}) => {
    const {token} = useSelector(state => state.reducer);
    const [allAnswers,setAllAnswers]=useState(null);
    const [playlistByGenre,setPlaylistByGenre]=useState([])
    const [artist1Playlist,setArtist1Playlist]=useState([])
    const [artist2Playlist,setArtist2Playlist]=useState([])
    const [listByFavorite,setListByFavorite]=useState([])


    useEffect(()=>{
        getAnswers();

    },[onSubmit,token])


useEffect(()=>{
   getPlaylistByGenre();
   getArtist1Playlist();
   getArtist2Playlist();
   getFavoriteSong()
},[allAnswers])


    const getAnswers =async () => {
        const response = await axios.create({baseURL: 'http://10.0.0.1:8989'}).get('/get-user-preferences?token=' + token)
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

                fetch('https://shazam-api7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre?genre='+allAnswers.genre+'&limit=5', options)
                    .then(response => response.json())
                    .then(response => setSongs(response))
                    .catch(err => console.error(err));

            }
        }catch (error){
            console.log("error from playlist by genre "+ error)
        }

    }
   const getArtist1Playlist=()=>{
        try {
            if (allAnswers!==null){
                const artist1Songs = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '38fefeb706mshdeefd590dcb5b1fp1a76bdjsn744bb3ebe44f',
                        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                    }
                };
                fetch('https://shazam.p.rapidapi.com/search?term='+allAnswers.artist1+'&locale=en-US&offset=0&limit=5', artist1Songs)
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
                        'X-RapidAPI-Key': '38fefeb706mshdeefd590dcb5b1fp1a76bdjsn744bb3ebe44f',
                        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                    }
                }
                fetch('https://shazam.p.rapidapi.com/search?term='+allAnswers.artist2+'&locale=en-US&offset=0&limit=5', artist2Songs)
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
                        'X-RapidAPI-Key': '38fefeb706mshdeefd590dcb5b1fp1a76bdjsn744bb3ebe44f',
                        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                    }
                }
                fetch('https://shazam.p.rapidapi.com/search?term='+allAnswers.favoriteSong+'&locale=en-US&offset=0&limit=1', favoriteSong)
                    .then(response => response.json())
                    .then(response => getByFavorite(response.tracks.hits[0].track.key) )
                    .catch(err => console.error("There is error in fetching data: "+err));

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
                    .catch(err => console.error(err));
            } else {
                console.log("song key is empty");
            }
        }

       const setRelatedSongList=(response)=>{
          let tempSongs=[];
          response.map((song)=>{
              const currentSong={
                  title:song.title,
                  artist: song.subtitle,
                  url: song.hub.actions[1].uri,
                  coverImage:song.images.background,
              }
              tempSongs.push(currentSong);
          })
           setListByFavorite(tempSongs)
       }


     const setArtistSong=(response,artist)=>{
         let tempArray=[]
         response.map((song,index) => {
             const currentSong = {
                 songIndex:index,
                 title: song.track.title,
                 artist: song.track.subtitle,
                 url: song.track.hub.actions[1].uri,
                 coverImage:song.track.images.background,


             };

             tempArray.push(currentSong);
             if (artist===1){
                 setArtist1Playlist(tempArray);
             }else {
                 setArtist2Playlist(tempArray);

             }
         });
     }

    const setSongs=(response)=>{
        let tempArray = []
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
        <ScrollView>
            {
               allAnswers===null?
                 <Questionnaire/>
                    :
                    <View>

                     <View>
                         <Text>Music By {allAnswers.genre}</Text>
                         <Player songList={playlistByGenre} page={'list'} toggleFavorite={null}/>
                     </View>

                      <View>
                          <Text>Music by {allAnswers.artist1}</Text>
                          <Player songList={artist1Playlist} page={'list'} toggleFavorite={null}/>
                      </View>

                       <View>
                           <Text>Music by {allAnswers.artist2}</Text>
                           <Player songList={artist2Playlist} page={'list'} toggleFavorite={null}/>
                       </View>
                        <View>
                            <Text>Music relate to your favorite song {allAnswers.favoriteSong}</Text>
                            <Player songList={listByFavorite} page={'list'} toggleFavorite={null}/>
                        </View>

                    </View>
            }


        </ScrollView>
    );
};

export default PersonalRecommendations;
