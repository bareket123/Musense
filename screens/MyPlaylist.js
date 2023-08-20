import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import axios from "axios";
import Player from "./Player";

export default function MyPlaylist({ navigation }) {
    const [sound, setSound] = useState(null);
   // const { playList, playedRecently } = useSelector(state => state.reducer);
     const {token } = useSelector(state => state.reducer);
    const [playlist,setPlaylist]=useState([]);

    // const playSound = async (song) => {
    //     if (!song) {
    //         return;
    //     }
    //
    //     try {
    //         if (sound) {
    //             await sound.unloadAsync();
    //         }
    //
    //         const { sound: newSound } = await Audio.Sound.createAsync({ uri: song.url });
    //         setSound(newSound);
    //         await newSound.playAsync();
    //     } catch (error) {
    //         console.error('Error playing sound:', error);
    //     }
    // };
    //
    // const pauseSound = () => {
    //     if (sound) {
    //         sound.pauseAsync().catch(error => {
    //             console.error('Error pausing sound:', error);
    //         });
    //     }
    // };
    // const deleteSong=async (song) => {
    //     const response = await axios.create({baseURL: 'http://10.0.0.1:8989'}).post('/delete-song?songId=' + song.id);
    //    if (response.data.success){
    //      alert("delete")
    //    }else {
    //        alert(response.data.errorCode)
    //    }
    // }

    // useEffect(() => {
    //     return () => {
    //         if (sound) {
    //             sound.unloadAsync().catch(error => {
    //                 console.error('Error unloading sound:', error);
    //             });
    //         }
    //     };
    // }, [sound]);

    const getPlaylist=async ()=>{
        const response = await axios.create({baseURL: 'http://10.0.0.1:8989'}).post('/get-playlist?token=' + token);
        if (response.data.success){
          setPlaylist(response.data.playlist)
        }else{
            alert(response.data.errorCode)
        }

    }

    useEffect(()=>{
        getPlaylist().then(r => {});
    })

    // const renderSong = ({ item }) => (
    //     <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%' , backgroundColor:'pink'}}>
    //         <MaterialCommunityIcons name="play-box" size={24} color="black" />
    //         <Text style={{ fontSize: 16, color: 'purple' }}>{item.title}</Text>
    //         <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => playSound(item)}>
    //             <Text>Play</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => pauseSound()}>
    //             <Text>Pause</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={{ marginLeft: 50 }} onPress={() =>deleteSong(item)}>
    //             <AntDesign name="delete" size={24} color="black" />
    //         </TouchableOpacity>
    //     </View>
    // );

    return (
        <View>
            <Text>{"\n"}</Text>
            <Text>My Playlist:</Text>
            {
                playlist.length>0?
                    <Player songList={playlist} page={'playlist'} toggleFavorite={null}/>

                // <FlatList
                //     data={playlist}
                //     renderItem={renderSong}
                //     keyExtractor={(item) => item.id}
                // />
                    :
                    <Text>you haven't had songs</Text>

            }

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor:'pink',
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});
