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
import globalStyles from "../styles/globalStyles";

export default function MyPlaylist({ navigation }) {
     const {token } = useSelector(state => state.reducer);
    const [myPlaylist,setMyPlaylist]=useState([]);
    const[messageCode, setMessageCode] = useState(0);

    const getPlaylist=async ()=>{
        try {
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-playlist?token=' + token);
            if (response.data.success){
                setMyPlaylist(response.data.playlist)
            }else{
                setMessageCode(response.data.errorCode);
            }
            setMessageCode(0);

        }catch (error){
            console.log(error)
        }

    }

    useEffect(()=>{
        getPlaylist().then(r => {});
    },[myPlaylist])


    return (
        <View style={globalStyles.flexProp}>
            <Text>{"\n"}</Text>
            <Text>My Playlist:</Text>
            {
                myPlaylist.length>0?
                    <View style={globalStyles.flexProp}>
                        <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null}/>
                    </View>

                    :
                    <Text>you haven't had songs</Text>

            }
            {
                messageCode!==0&&
                <ErrorAlert message={messageCode}/>
            }
        </View>
    );
}

