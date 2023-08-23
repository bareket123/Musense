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
import {setIsLoggedIn, setToken, setUsername} from "../redux/actions";
import {useNavigation} from "@react-navigation/native";



export default function StackNav (){
    const {username}= useSelector(state => state.reducer);

const {isLoggedIn}= useSelector(state => state.reducer);
const [image,setImage]=useState('https://cdn-icons-png.flaticon.com/512/3271/3271191.png');
const Stack = createStackNavigator();
const dispatch = useDispatch(); // Get the dispatch function
const navigation = useNavigation();


    useEffect(()=>{


    },[isLoggedIn])

    useEffect(()=>{
        setTokenAndUsername().then(r => {});

    },[])

async function handleLout(){
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('username')
    setUsername('guest')
    dispatch(setIsLoggedIn(false))
    setImage('https://cdn-icons-png.flaticon.com/512/3271/3271191.png')
    console.log("delete")
}

    async function setTokenAndUsername(){
        await AsyncStorage.getItem('token').
       then(res => dispatch(setToken(res)))
        await AsyncStorage.getItem('username').
        then(res => dispatch(setUsername(res)))
        if (username!==null){
            dispatch(setIsLoggedIn(true))
        }
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
                            uri: image,
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

        // <Drawer.Navigator screenOptions={{
        //     headerShown: true,
        //     headerStyle: {
        //         backgroundColor: 'transparent',
        //         elevation: 0,
        //         shadowOpacity: 0,
        //     },
        //     headerTitle: '',
        // }}
        //                   drawerContent={props => <CustomDrawer {...props} />} >
        //     {
        //         !isLoggedIn ?
        //         <Drawer.Navigator>
        //         <Drawer.Screen name='login' component={Login}/>
        //         </Drawer.Navigator>
        //             :
        //             <Drawer.Navigator>
        //                 <Drawer.Screen name="Home" component={HomeScreen} />
        //                 <Stack.Screen name='Popular' component={PopularNow}/>
        //                 <Stack.Screen name='artist' component={MusicByArist}/>
        //                 <Stack.Screen name='friends' component={MusicByFriends}/>
        //                 <Stack.Screen name='playlist' component={MyPlaylist}/>
        //                 <Stack.Screen name='played' component={PlayedRecently}/>
        //                 <Stack.Screen name='My Friends' component={MyFriends}/>
        //                 <Stack.Screen name='Search Friends' component={SearchFriends}/>
        //                 <Stack.Screen name='Personalized Recommendations' component={PersonalRecommendations}/>
        //             </Drawer.Navigator>
        //     }
        //
        // </Drawer.Navigator>
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

            !isLoggedIn  ? (
            <Drawer.Screen name='login' component={Login} />
        ) : (
            <>
                <Drawer.Screen name='Home' component={HomeScreen} />
                <Drawer.Screen name='Popular' component={PopularNow} />
                <Stack.Screen name='artist' component={MusicByArist}/>
                <Stack.Screen name='friends' component={MusicByFriends}/>
                <Stack.Screen name='playlist' component={MyPlaylist}/>
                <Stack.Screen name='played' component={PlayedRecently}/>
                <Stack.Screen name='My Friends' component={MyFriends}/>
                <Stack.Screen name='Search Friends' component={SearchFriends}/>
                <Stack.Screen name='Personalized Recommendations' component={PersonalRecommendations}/>
            </>
        )}
    </Drawer.Navigator>


    )

}