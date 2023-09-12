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
import MyConnections from "./MyConnections";
import FindFriends from "./FindFriends";
import PersonalRecommendations from "./PersonalRecommendations";
import {useDispatch, useSelector} from "react-redux";
import {LOCAL_SERVER_URL, resetState, setPlaylist} from "../redux/actions";
import axios from "axios";
import {PLAYLIST_NOT_EXIST} from "./Constans";
import ErrorAlert from "./ErrorAlert";



export default function StackNav (){

    const {username,token}= useSelector(state => state.reducer);
    const dispatch = useDispatch(); // Get the dispatch function
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
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('username')
    await AsyncStorage.removeItem('picture')
    dispatch(resetState());
    // await axios.delete(`https://app.nativenotify.com/api/app/indie/sub/11941/7alrGeOddFsagJZ65YfsHS/your-indie-sub-id-here`)
    console.log("log out")
}


const CustomDrawer = props => {
    return (
        <ScrollView >
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
                        padding: 10,
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
                backgroundColor: 'black',
                shadowOpacity: 0,
            },
            headerTitle: '',
            headerTintColor:'white',
        }}
        drawerContent={props => <CustomDrawer {...props} />}
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
                // ? (
            <Stack.Screen name='login' component={Login} />
        }
        {
            messageCode !== 0 &&
            <ErrorAlert message={messageCode} />
        }


    </Drawer.Navigator>


    )

}
