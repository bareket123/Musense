import {LOCAL_SERVER_URL, setPlaylist,setDeleteSong} from "../redux/actions";
import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {useSelector,useDispatch} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import CurrentPlaying from "./CurrentPlaying";
import {pauseAudio} from "./playAudio";

export default function Player ({ songList,page,toggleFavorite  }) {
    const dispatch = useDispatch();
    const [currentlyPlaying,setCurrentlyPlaying]=useState({});
    const {token,playList} = useSelector(state => state.reducer);

    useFocusEffect(
        React.useCallback(() => {
            if (currentlyPlaying!==undefined)
                setCurrentlyPlaying(undefined);
        }, [])
    );

    const pressSong=async (song) => {
        setCurrentlyPlaying(song);
        await pauseAudio();


    }


    function addLovedSongs(song) {
        if (!song.isFavorite){
            sendPlaylistToServer(song).then(r => {dispatch(setPlaylist(song))})
        }else {
            alert("no longer favorite")
        }

    }

    const renderSong = ({ item }) => (
        <View>
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%'}}>
                <TouchableOpacity style={{flex:1}}  onPress={()=>{pressSong(item)}}>
                    <Text style={{color:'white',fontWeight:'bold'}}>{item.title}</Text>
                    <Text style={{color:'white'}}>{item.artist}</Text>
                </TouchableOpacity>
                {
                    page==='list'?
                        <AntDesign onPress={() => {
                            toggleFavorite(item.songIndex);
                            addLovedSongs(item);
                        }} name="heart"  size={30} color={ isSongInPlaylist(item.url) || item.isFavorite ? 'red' : 'green'}/>
                        :
                        <TouchableOpacity style={{ marginLeft: 50 }} onPress={() =>deleteSong(item)}>
                            <AntDesign name="delete" size={24} color="black" />
                        </TouchableOpacity>

                }

            </View>
            <View style={{ alignItems:'center' }} >

            </View>

        </View>
    )
    const deleteSong=async (song) => {
        const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/delete-song?songId=' + song.id);
        if (response.data.success){
            alert("delete")
            dispatch(setDeleteSong(song))
        }else {
            alert(response.data.errorCode)
        }
    }
    const sendPlaylistToServer = async (song) => {
        if (token !== null) {
            try {
                const encodedTitle = encodeURIComponent(song.title);
                const encodedArtist = encodeURIComponent(song.artist);
                const encodedUrl = encodeURIComponent(song.url);
                const encodedCoverImage = encodeURIComponent(song.coverImage);

                const url = `${LOCAL_SERVER_URL}/add-song?token=${token}&title=${encodedTitle}&artist=${encodedArtist}&url=${encodedUrl}&coverImage=${encodedCoverImage}`;

                const response = await axios.post(url);

                if (response.data.success) {
                    console.log("Updated successfully");
                } else {
                    alert(response.data.errorCode);
                }
            } catch (error) {
                console.error("Error while sending request:", error.message);
            }
        }
    };

    const isSongInPlaylist = (songUrl) => {
        let exist=false;
        if (playList!==undefined){
            exist=playList.some(song => song.url === songUrl);
        }

        return exist;
    };


    return(
        <View>
            {
                (currentlyPlaying!==undefined) &&
                <CurrentPlaying currentSong={currentlyPlaying} setSong={setCurrentlyPlaying} allSongs={songList} />
            }
            <FlatList
                data={songList}
                renderItem={renderSong}
                keyExtractor={(item, index) => index.toString()}

            />
        </View>
    )

}
