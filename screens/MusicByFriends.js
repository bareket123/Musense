import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    ImageBackground,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import axios from "axios";
import {useSelector} from "react-redux";
import Player from "./Player";
import {LOCAL_SERVER_URL} from "../redux/actions";
import ErrorAlert from "./ErrorAlert";
import  musicByFriendsStyle from '../styles/musicByFriendsStyle'

export default function MusicByFriends ({ navigation }) {
    const [playlistByFriends,setPlaylistByFriends]=useState([]);
    const {token} = useSelector(state => state.reducer);
    const[messageCode, setMessageCode] = useState(0);


    const getPlaylistByFriends=async ()=>{

        if (token!==null){
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/get-friends-playlist?token=' + token);
            if (response.data.success){
                setPlaylistByFriends(response.data.playlistByFriends);
            }else {
                setMessageCode(response.data.errorCode)
            }
        }else {
            console.log(" friends: token is empty")
        }
        setMessageCode(0);

    }

    useEffect(()=>{
        getPlaylistByFriends().then(r => {})
    })





    return (

        <View style={musicByFriendsStyle.container}>
       <View>
           {
               playlistByFriends.length>0?
                   <View>
                       <Text style={{color:'white'}}>listening to songs your friends love</Text>
                       <Player songList={playlistByFriends} page={'playlist'} toggleFavorite={null}/>

                   </View>
                   :
                   <View>
                       <Text style={{color:'white'}}>Looks like no one has added any songs yet </Text>
                       <Button title={"go search for more friends"} onPress={()=>{navigation.navigate('Search Friends')}}/>

                   </View>

           }
           {
               messageCode!==0&&
               <ErrorAlert message={messageCode}/>
           }
       </View>
        </View>

    );
};




