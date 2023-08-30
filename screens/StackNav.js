import React, {useEffect, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import Login from "./Login";
import PopularNow from "./PopularNow";
import MusicByArist from "./MusicByArtist";
import MusicByFriends from "./MusicByFriends";
import MyPlaylist from "./MyPlaylist";
import PlayedRecently from "./PlayedRecently";
import MyFriends from "./MyFriends";
import SearchFriends from "./SearchFriends";
import PersonalRecommendations from "./PersonalRecommendations";
import {useDispatch, useSelector} from "react-redux";
import {LOCAL_SERVER_URL, resetState, setPlaylist} from "../redux/actions";
import axios from "axios";



export default function StackNav (){
    const {username,token}= useSelector(state => state.reducer);
    const dispatch = useDispatch(); // Get the dispatch function

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
            console.log("playlist undefided")
        }
    }
    const getPlaylist=async ()=>{
        try {
           if (token!==""){
               const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-playlist?token=' + token);
               if (response.data.success){
                   setThePlaylistInStore(response.data.playlist)

               }else{
                   alert(response.data.errorCode)
               }}

        }catch (error){
            console.log("error getting playlist "+ error)
        }


    }


async function handleLout(){
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('username')
    await AsyncStorage.removeItem('picture')
    dispatch(resetState());
    console.log("delete")
}


const CustomDrawer = props => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                        backgroundColor: '#f6f6f6',
                        marginBottom: 20,
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 18 }}>Hello {isLoggedIn ? username : 'guest'}</Text>
                    </View>
                    <Image
                        source={{
                            uri: picture!==''?picture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3J7fax0r25yrhXbt64ICXsKZ-Clm_txAxmw&usqp=CAU',
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                </View>
                <DrawerItemList {...props} />
                <TouchableOpacity
                    style={{
                        bottom: 0,
                        width: '100%',
                        backgroundColor: '#f6f6f6',
                        padding: 20,
                        borderTopWidth: 1,
                        borderTopColor: '#ddd',
                    }}
                    onPress={handleLout}
                >
                    {
                        isLoggedIn &&
                        <Text>Log Out</Text>

                    }
                </TouchableOpacity>
            </DrawerContentScrollView>
        </ScrollView>
    );
};

const Drawer=createDrawerNavigator();

    return(

    <Drawer.Navigator
        screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
            },
            headerTitle: '',
        }}
        drawerContent={props => <CustomDrawer {...props} />}
    >
        {
            isLoggedIn &&
            <>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Popular' component={PopularNow} />
                <Stack.Screen name='artist' component={MusicByArist}/>
                <Stack.Screen name='friends' component={MusicByFriends}/>
                <Stack.Screen name='playlist' component={MyPlaylist}/>
                <Stack.Screen name='played' component={PlayedRecently}/>
                <Stack.Screen name='My Friends' component={MyFriends}/>
                <Stack.Screen name='Search Friends' component={SearchFriends}/>
                <Stack.Screen name='Personalized Recommendations' component={PersonalRecommendations}/>
            </>
        }

        {

            !isLoggedIn &&
                // ? (
            <Stack.Screen name='login' component={Login} />
        }

    </Drawer.Navigator>


    )

}
