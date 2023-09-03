import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import axios from "axios";
import Player from "./Player";
import {LOCAL_SERVER_URL, setPlaylist} from "../redux/actions";
import {useDispatch} from "react-redux";
import ErrorAlert from "./ErrorAlert";
import Logo from "./Logo";
import  myPlaylistStyle from '../styles/myPlaylistStyle'

export default function MyPlaylist({ navigation }) {
     const {token } = useSelector(state => state.reducer);
    const [myPlaylist,setMyPlaylist]=useState([]);
    const[messageCode, setMessageCode] = useState(0);

    const getPlaylist=async ()=>{
        const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-playlist?token=' + token);
        if (response.data.success){
          setMyPlaylist(response.data.playlist)
        }else{
            setMessageCode(response.data.errorCode);
        }
        setMessageCode(0);

    }

    useEffect(()=>{
        getPlaylist().then(r => {});
    },[myPlaylist])


    return (
        <View style={myPlaylistStyle.container}>

        <View>
            <Text>{"\n"}</Text>
            <Text style={{color:'white'}}>My Playlist:</Text>
            {
                myPlaylist.length>0?
                    <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null}/>
                    :
                    <Text style={{color:'white'}}>you haven't had songs</Text>

            }
            {
                messageCode!==0&&
                <ErrorAlert message={messageCode}/>
            }
        </View>
        </View>
    );
}

