import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import axios from "axios";
import Player from "./Player";
import {LOCAL_SERVER_URL, setPlaylist} from "../redux/actions";
import {useDispatch} from "react-redux";

export default function MyPlaylist({ navigation }) {
     const {token } = useSelector(state => state.reducer);
    const [myPlaylist,setMyPlaylist]=useState([]);
    const dispatch=useDispatch();
    const getPlaylist=async ()=>{
        const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-playlist?token=' + token);
        if (response.data.success){
          setMyPlaylist(response.data.playlist)
        }else{
            alert(response.data.errorCode)
        }

    }
    useEffect(()=>{
      dispatch(setPlaylist(myPlaylist))
    },[myPlaylist])

    useEffect(()=>{
        getPlaylist().then(r => {});
    },[])


    return (
        <View>
            <Text>{"\n"}</Text>
            <Text>My Playlist:</Text>
            {
                myPlaylist.length>0?
                    <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null}/>
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
