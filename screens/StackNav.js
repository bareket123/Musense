import React, {useEffect, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import Login from "./Login";
import PopularNow from "./PopularNow";
import MusicByArist from "./MusicByArtist";
import MusicByFriends from "./MusicByFriends";
import MyPlaylist from "./MyPlaylist";
import PlayedRecently from "./PlayedRecently";
import MyConnections from "./MyConnections";
import FindFriends from "./FindFriends";
import PersonalRecommendations from "./PersonalRecommendations";
import {useDispatch, useSelector} from "react-redux";
import {LOCAL_SERVER_URL, resetState, setPlaylist} from "../redux/actions";
import axios from "axios";
import {PLAYLIST_NOT_EXIST} from "./Constans";
import ErrorAlert from "./ErrorAlert";
import StackNavStyle from "../styles/StackNavStyle";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import { DrawerItem } from "@react-navigation/drawer";


export default function StackNav (){
    const {username,token}= useSelector(state => state.reducer);
    const dispatch = useDispatch();
    const [messageCode, setMessageCode] = useState(0);
    const {isLoggedIn}= useSelector(state => state.reducer);
    const {picture}= useSelector(state => state.reducer);
    const Stack = createStackNavigator();

    useEffect(()=>{
    getPlaylist().then(() => {console.log("get playlist from server")})
    },[token])

    const setThePlaylistInStore=(playlist)=>{
        if (playlist!==undefined){
            playlist.map((song)=>{
                dispatch(setPlaylist(song))
            })
        }else {
            console.log("playlist undefined")
            setMessageCode(PLAYLIST_NOT_EXIST)
        }
    }

    const getPlaylist=async ()=>{
        try {
           if (token!==""){
               const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-playlist?token=' + token);
               if (response.data.success){
                   setThePlaylistInStore(response.data.playlist)
               }else{
                   console.log(response.data.errorCode)
                   setMessageCode(response.data.errorCode)
               }}
        }catch (error){
            console.log("error getting playlist "+ error)
        }
    }

async function handleLout(){
        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('username')
            await AsyncStorage.removeItem('picture')
            dispatch(resetState());
            await axios.delete(`https://app.nativenotify.com/api/app/indie/sub/11941/7alrGeOddFsagJZ65YfsHS/`+`${username}`)
            console.log("log out")
        }catch (error){
            console.log("error log out "+ error)
        }
}

const CustomDrawer = props => {
    const drawerItems = [
        { name: "Home", screen: "Home", icon: "home-outline" },
        { name: "Popular", screen: "Popular", icon: "flame-outline" },
        { name: "Playlist", screen: "Playlist", icon: "play-circle-outline" },
        { name: "Played", screen: "Played", icon: "musical-notes-outline" },
        { name: "Search Artists", screen: "Search Artists", icon: "search" },
        { name: "Find Friends", screen: "Find Friends", icon: "people" },
        { name: "My Connections", screen: "My Connections", icon: "globe" },
        { name: "Friends Music", screen: "Friends Music", icon: "headset" },
        { name: "Recommendations", screen: "Recommendations", icon: "heart" },
    ];

    return (
        <ScrollView>
            <DrawerContentScrollView {...props}>
       <ImageBackground source={{uri:'https://wallpapercrafter.com/sizes/1366x768/87115-lines-simple-background-abstract-hd-4k-dark-black-dribbble-oled.jpg'}}>
                         <View style={StackNavStyle.userView}>
                             <View>
                                 <Text style={StackNavStyle.userViewTitle}>Hello {isLoggedIn ? username : 'guest'}</Text>
                             </View>
                             <Image
                                source={{uri: picture!==''?picture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3J7fax0r25yrhXbt64ICXsKZ-Clm_txAxmw&usqp=CAU'}}
                                style={StackNavStyle.userImage}
                            />
                        </View>
                {
                    isLoggedIn&&
                    drawerItems.map((item, index) => (
                            <DrawerItem
                                key={index}
                                label={item.name}
                                labelStyle={StackNavStyle.labelStyle}
                                icon={({ size }) => (
                                    <Ionicons name={item.icon} color={'white'} size={size} />
                                )}
                                onPress={() => props.navigation.navigate(item.screen)}
                                style={{
                                    borderTopWidth: index!==0?1:0,
                                    borderTopColor: '#ddd'
                                }}
                            />
                        ))
                }
                {
                    isLoggedIn &&
                    <TouchableOpacity style={StackNavStyle.logOutButton} onPress={handleLout}>
                        <AntDesign name="logout" size={24} color='#9B2335' style={{alignSelf:'center'}} />
                         <Text style={StackNavStyle.logOutText}>  Log Out</Text>
                    </TouchableOpacity>
                }
            </ImageBackground>
            </DrawerContentScrollView>
        </ScrollView>
    );
};

const Drawer=createDrawerNavigator();

    return(
    <Drawer.Navigator
        screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: 'black', shadowOpacity: 0},
            headerTitle: '',
            headerTintColor:'white',
            drawerStyle:{backgroundColor:'black'},
            drawerLabel:{color:'white'}
        }}
        drawerContent={props => <CustomDrawer {...props} /> }
    >
        {
            isLoggedIn &&
            <>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Popular' component={PopularNow} />
                <Stack.Screen name='Playlist' component={MyPlaylist}/>
                <Stack.Screen name='Played' component={PlayedRecently}/>
                <Stack.Screen name='Search Artists' component={MusicByArist}/>
                <Stack.Screen name='Find Friends' component={FindFriends}/>
                <Stack.Screen name='My Connections' component={MyConnections}/>
                <Stack.Screen name="Friends Music" component={MusicByFriends}/>
                <Stack.Screen name='Recommendations' component={PersonalRecommendations}/>
            </>
        }
        {
            !isLoggedIn &&
            <Stack.Screen name='login' component={Login} />
        }
        {
            messageCode !== 0 &&
            <ErrorAlert message={messageCode} />
        }
    </Drawer.Navigator>
    )
}
