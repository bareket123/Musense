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

       <View>
           {
               playlistByFriends.length>0?
                   <View>
                       <Text>listening to songs your friends love</Text>
                       <Player songList={playlistByFriends} page={'playlist'} toggleFavorite={null}/>

                   </View>
                   :
                   <View>
                       <Text>Looks like no one has added any songs yet </Text>
                       <Button title={"go search for more friends"} onPress={()=>{navigation.navigate('Search Friends')}}/>

                   </View>

           }
           {
               messageCode!==0&&
               <ErrorAlert message={messageCode}/>
           }
       </View>

    );
};

const styles = StyleSheet.create({
    viewStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonExit: {
        backgroundColor: 'orange',
        borderRadius: 50,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 200,
        shadowColor: 'black',
        position: 'absolute',
        left: '30%',
        marginLeft: -50,
    },
    Button: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 200,
        shadowColor: 'black',
        position: 'absolute',
        left: '70%',
        marginLeft: -100,
    },
    buttonText: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold',
    },
    headerText: {
        justifyContent: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 50,
        color:'orange',
        shadowColor:'white'
    },
    text: {

        flexShrink: 1
    },

});






