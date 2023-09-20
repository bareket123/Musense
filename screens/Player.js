import {LOCAL_SERVER_URL, setPlaylist,setDeleteSong,setIsSongPlaying} from "../redux/actions";
import React, { useState} from "react";
import { FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useSelector,useDispatch} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import CurrentPlaying from "./CurrentPlaying";
import {pauseAudio} from "../Utilities/playAudio";
import playerStyle from "../styles/playerStyle";
import globalStyles from "../styles/globalStyles";
import {DELETE} from "../Utilities/Constans";
import ErrorAlert from "../Utilities/ErrorAlert";

export default function Player ({ songList,page,toggleFavorite}) {
    const dispatch = useDispatch();
    const [currentlyPlaying,setCurrentlyPlaying]=useState({});
    const {token,playList} = useSelector(state => state.reducer);
    const [messageCode, setMessageCode] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            if (currentlyPlaying!==undefined)
                setCurrentlyPlaying(undefined);
        }, [])
    );
    const pressSong=async (song) => {
        setCurrentlyPlaying(song);
       dispatch(setIsSongPlaying(true));
        await pauseAudio();

    }
    function addLovedSongs(song) {
        if (!isSongInPlaylist(song.url)){
            sendPlaylistToServer(song).then(r => {dispatch(setPlaylist(song))})
        }

    }
    const renderSong = ({ item }) => (
        <View style={[playerStyle.mainView,{backgroundColor: page === 'recently' ? 'rgba(128, 128, 128, 0.3)':'rgba(0, 0, 0, 0.5)'}]}>
            <View style={playerStyle.secondView}>
                <TouchableOpacity style={globalStyles.flexProp} onPress={() => { pressSong(item) }}>
                    <View style={playerStyle.center}>
                        <Image source={{ uri: item.coverImage }} style={playerStyle.songImage } />
                        <View style={globalStyles.flexProp}>
                            <Text style={playerStyle.songTitle}>{item.title}</Text>
                            <Text style={playerStyle.songArtist}>{item.artist}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {page === 'list'  || page==='playlistFriends'  ?
                    <AntDesign onPress={() => { toggleFavorite(page==='playlistFriends'?item.id:item.songIndex); addLovedSongs(item); }}
                               name="heart" size={30} color={isSongInPlaylist(item.url) || item.isFavorite ? 'red' : 'green'} />
                    :
                    page!=='recently'&&
                    <TouchableOpacity style={playerStyle.deleteButton} onPress={() => deleteSong(item)}>
                        <AntDesign name="delete" size={24} color="white" />
                    </TouchableOpacity>
                }
            </View>

        </View>
    )
    const deleteSong=async (song) => {
        const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/delete-song?songId=' + song.id);
            if (response.data.success){
                setMessageCode(DELETE)
                dispatch(setDeleteSong(song))
            }else {
                setMessageCode(response.data.errorCode)
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
                setMessageCode(error.message)
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
                (currentlyPlaying!==undefined) ?
                        <CurrentPlaying currentSong={currentlyPlaying} setSong={setCurrentlyPlaying} allSongs={songList} />
                    :
                    <FlatList
                        data={songList}
                        renderItem={renderSong}
                        keyExtractor={(item, index) => index.toString()}
                    />

            }
            {
                messageCode !== 0 &&
                <ErrorAlert message={messageCode} />
            }
        </View>
    )
}
