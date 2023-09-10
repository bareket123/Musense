// //של ברקת
// import React, { useState, useEffect } from 'react';
// import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
// import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
// import { useSelector } from 'react-redux';
// import { Audio } from 'expo-av';
// import axios from "axios";
// import Player from "./Player";
// import {LOCAL_SERVER_URL, setPlaylist} from "../redux/actions";
// import {useDispatch} from "react-redux";
// import ErrorAlert from "./ErrorAlert";
// import Logo from "./Logo";
// import  myPlaylistStyle from '../styles/myPlaylistStyle'
// import globalStyles from "../styles/globalStyles";
//
// export default function MyPlaylist({ navigation }) {
//      const {token } = useSelector(state => state.reducer);
//     const [myPlaylist,setMyPlaylist]=useState([]);
//     const[messageCode, setMessageCode] = useState(0);
//
//     const getPlaylist=async ()=>{
//         try {
//             const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-playlist?token=' + token);
//             if (response.data.success){
//                 setMyPlaylist(response.data.playlist)
//             }else{
//                 setMessageCode(response.data.errorCode);
//             }
//             setMessageCode(0);
//
//         }catch (error){
//             console.log(error)
//         }
//
//     }
//
//     useEffect(()=>{
//         getPlaylist().then(r => {});
//     },[myPlaylist])
//
//
//     return (
//         <View style={globalStyles.flexProp}>
//             <Text>{"\n"}</Text>
//             <Text>My Playlist:</Text>
//             {
//                 myPlaylist.length>0?
//                     <View style={globalStyles.flexProp}>
//                         <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null}/>
//                     </View>
//
//                     :
//                     <Text>you haven't had songs</Text>
//
//             }
//             {
//                 messageCode!==0&&
//                 <ErrorAlert message={messageCode}/>
//             }
//         </View>
//     );
// }
//


// //של אופיר
// import React, { useState, useEffect } from 'react';
// import {View, Text, ImageBackground,FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
// import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
// import { useSelector } from 'react-redux';
// import { Audio } from 'expo-av';
// import axios from "axios";
// import Player from "./Player";
// import {LOCAL_SERVER_URL, setPlaylist} from "../redux/actions";
// import {useDispatch} from "react-redux";
// import ErrorAlert from "./ErrorAlert";
// import Logo from "./Logo";
// import  myPlaylistStyle from '../styles/myPlaylistStyle'
//
// export default function MyPlaylist({ navigation }) {
//     const {token } = useSelector(state => state.reducer);
//     const [myPlaylist,setMyPlaylist]=useState([]);
//     const[messageCode, setMessageCode] = useState(0);
//
//     const getPlaylist=async ()=>{
//         const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-playlist?token=' + token);
//         if (response.data.success){
//             setMyPlaylist(response.data.playlist)
//         }else{
//             setMessageCode(response.data.errorCode);
//         }
//         setMessageCode(0);
//     }
//
//     useEffect(()=>{
//         getPlaylist().then(r => {});
//     },[myPlaylist])
//
//     // return (
//     //     <ImageBackground source={require('../images/myPlaylist.jpg')} style={myPlaylistStyle.background}>
//     //         <View>
//     //             <View style={myPlaylistStyle.textTitle} >
//     //                 { (
//     //                     <Text style={myPlaylistStyle.textHeader}>My Playlist:</Text>
//     //                 )}
//     //             </View>
//     //             {
//     //                 myPlaylist.length>0?
//     //                     <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null}/>
//     //                     :
//     //                     <View>
//     //                         { (
//     //                              <Text style={myPlaylistStyle.noPlaylist}>you haven't songs</Text>
//     //                         )}
//     //                         <View style={myPlaylistStyle.customButton}>
//     //                             <TouchableOpacity onPress={() => { navigation.navigate('Popular') }}>
//     //                                 <Text style={myPlaylistStyle.buttonText}>Go search for more songs</Text>
//     //                             </TouchableOpacity>
//     //                         </View>
//     //                     </View>
//     //             }
//     //             {
//     //                 messageCode!==0&&
//     //                 <ErrorAlert message={messageCode}/>
//     //             }
//     //         </View>
//     //     </ImageBackground>
//     // );
//
//     return (
//         <ImageBackground source={require('../images/myPlaylist.jpg')} style={myPlaylistStyle.background}>
//             <View>
//                 {myPlaylist.length > 0 && (
//                     <View style={myPlaylistStyle.textTitle}>
//                         {(
//                             <Text style={myPlaylistStyle.textHeader}>
//                                 My Playlist:
//                             </Text>
//                         )}
//                     </View>
//                 )}
//                 {myPlaylist.length > 0 ? (
//                     <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null} />
//                 ) : (
//                     <View>
//                         {(
//                             <Text style={myPlaylistStyle.noPlaylist}>
//                                 you haven't songs
//                             </Text>
//                         )}
//                         <View style={myPlaylistStyle.customButton}>
//                             <TouchableOpacity onPress={() => { navigation.navigate('Popular') }}>
//                                 <Text style={myPlaylistStyle.buttonText}>Go search for more songs</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )}
//                 {messageCode !== 0 && <ErrorAlert message={messageCode} />}
//             </View>
//         </ImageBackground>
//     );
//
//
// }



//מאוחד עם scrolview
// import React, { useState, useEffect } from 'react';
// import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { useSelector } from 'react-redux';
// import axios from "axios";
// import Player from "./Player";
// import { LOCAL_SERVER_URL } from "../redux/actions";
// import ErrorAlert from "./ErrorAlert";
// import myPlaylistStyle from '../styles/myPlaylistStyle';
//
// export default function MyPlaylist({ navigation }) {
//     const { token } = useSelector(state => state.reducer);
//     const [myPlaylist, setMyPlaylist] = useState([]);
//     const [messageCode, setMessageCode] = useState(0);
//
//     const getPlaylist = async () => {
//         const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/get-playlist?token=' + token);
//         if (response.data.success) {
//             setMyPlaylist(response.data.playlist);
//         } else {
//             setMessageCode(response.data.errorCode);
//         }
//         setMessageCode(0);
//     }
//
//     useEffect(() => {
//         getPlaylist();
//     }, [myPlaylist])
//
//     return (
//         <ImageBackground source={require('../images/myPlaylist.jpg')} style={myPlaylistStyle.background}>
//             <ScrollView>
//                 <View>
//                     {myPlaylist.length > 0 && (
//                         <View style={myPlaylistStyle.textTitle}>
//                             <Text style={myPlaylistStyle.textHeader}>My Playlist:</Text>
//                         </View>
//                     )}
//                     {myPlaylist.length > 0 ? (
//                         <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null} />
//                     ) : (
//                         <View>
//                             <Text style={myPlaylistStyle.noPlaylist}>
//                                 You haven't songs
//                             </Text>
//                             <View style={myPlaylistStyle.customButton}>
//                                 <TouchableOpacity onPress={() => { navigation.navigate('Popular') }}>
//                                     <Text style={myPlaylistStyle.buttonText}>Go search for more songs</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     )}
//                     {messageCode !== 0 && <ErrorAlert message={messageCode} />}
//                 </View>
//             </ScrollView>
//         </ImageBackground>
//     );
// }


import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from "axios";
import Player from "./Player";
import { LOCAL_SERVER_URL } from "../redux/actions";
import ErrorAlert from "./ErrorAlert";
import myPlaylistStyle from '../styles/myPlaylistStyle';

export default function MyPlaylist({ navigation }) {
    const { token } = useSelector(state => state.reducer);
    const [myPlaylist, setMyPlaylist] = useState([]);
    const [messageCode, setMessageCode] = useState(0);

    const getPlaylist = async () => {
        const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/get-playlist?token=' + token);
        if (response.data.success) {
            setMyPlaylist(response.data.playlist);
        } else {
            setMessageCode(response.data.errorCode);
        }
        setMessageCode(0);
    }

    useEffect(() => {
        getPlaylist();
    }, [myPlaylist])

    return (
        <ImageBackground source={require('../images/myPlaylist.jpg')} style={myPlaylistStyle.background}>
            <ScrollView>
                <View>
                    {myPlaylist.length > 0 && (
                        <View style={myPlaylistStyle.textTitle}>
                            <Text style={myPlaylistStyle.textHeader}>My Playlist:</Text>
                        </View>
                    )}
                    {myPlaylist.length > 0 ? (
                        <Player songList={myPlaylist} page={'playlist'} toggleFavorite={null} />
                    ) : (
                        <View>
                            <Text style={myPlaylistStyle.noPlaylist}>
                                You haven't songs
                            </Text>
                            <View style={myPlaylistStyle.customButton}>
                                <TouchableOpacity onPress={() => { navigation.navigate('Popular') }}>
                                    <Text style={myPlaylistStyle.buttonText}>Go search for more songs</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {messageCode !== 0 && <ErrorAlert message={messageCode} />}
                </View>
            </ScrollView>
        </ImageBackground>
    );
}


