import React, {useEffect, useState} from 'react';
import { View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import {Fontisto,Ionicons, SimpleLineIcons} from '@expo/vector-icons';
import axios from "axios";
import {LOCAL_SERVER_URL, setToken} from "../redux/actions";
import {useSelector} from "react-redux";
import ErrorAlert from "./ErrorAlert";
import {FOLLOWING} from "./Constans";
import { useFocusEffect } from '@react-navigation/native';
import EventSource from "react-native-event-source";
import Logo from "./Logo";
import searchFriendsStyle from "../styles/searchFriendsStyle";


const SearchFriends = ({ navigation }) => {
    const [searchFriend, setSearchFriend] = useState('');
    const [foundUser,setFoundUser]=useState(false);
    const [messageCode, setMessageCode] = useState(0);
    const [isAlertShown, setIsAlertShown] = useState(false);
    const [showLogo, setShowLogo] = useState(true);
    const {token} = useSelector(state => state.reducer);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            setSearchFriend('');
            setUsersFromServer();
        }, [])
    );
    const handleClearSearch = () => {
        setSearchFriend('');
        setFoundUser(false);
        setUsersFromServer();
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLogo(false);
        }, 5000); // 10000 milliseconds = 10 seconds

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleSearch = (text) => {
        setSearchFriend(text);
        const tempFilteredUsers = allUsers.filter((user) => {
            return user.username.toLowerCase().startsWith(text.toLowerCase())})
        tempFilteredUsers.length===0 ?
            setFilteredUsers(allUsers):
            setFilteredUsers(tempFilteredUsers)
        setFoundUser(tempFilteredUsers.length!==0)
    }

    useEffect(() => {
        setUsersFromServer().then(r => {})
    },[token]);

    useEffect(() => {
    },[searchFriend,filteredUsers]);
    // const search = async () => {
    //     setIsAlertShown(false);
    //
    //     const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/search-by-user-username?username=' + searchFriend);
    //     if (response.data.success) {
    //         setFoundUser(response.data.friendsDetailsModel);
    //         const logoTimeout = setTimeout(() => {
    //             setShowLogo(false);
    //         }, 5000);
    //
    //         return () => {
    //             clearTimeout(logoTimeout); // Clear the timeout on unmount
    //         };
    //     } else {
    //         setMessageCode(response.data.errorCode);
    //         setIsAlertShown(true);
    //     }
    //     setSearchFriend("");
    //     setMessageCode(0);
    //     setIsAlertShown(false);
    //
    // };

    const setUsersFromServer = async ()=>{
        if (token!==''){
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-all-Users-without-current?token=' + token);
            if (response.data.success){
                setAllUsers(response.data.myFriends);
                setFilteredUsers(response.data.myFriends)
            }else {
                alert(response.data.errorCode)
            }
        }else {
            console.log("token is empty")
        }

    }

    const create_SSE_Connection=()=>{
        try {
            if (foundUser!==null) {
                //     const eventSource = new RNEventSource(LOCAL_SERVER_URL + '/sse-handler?token=' + token+'&friendUsername='+foundUser.username);
                //     eventSource.onMessage('message', (event) => {
                //         alert("fgreg")
                //         alert(event.type); // message
                //         if (event.data) {
                //             alert(event.data);
                //             console.log(event.data)
                //         } else {
                //
                //             alert('Event data is empty or null.');
                //         }
                //     });
                // }else {
                //     alert("nulll")
                // }
                const sse = new EventSource(LOCAL_SERVER_URL + '/sse-handler?token=' + token + '&friendUsername=' + foundUser.username);
                sse.onmessage = (message) => {
                    const data = message.data;
                    alert(data)
                    console.log("this is: "+ data)
                }
            }
        } catch (error) {
            console.error('Error creating event source:', error);
        }
    }

    const followingRequest = async (user)=>{
        if (token!==''){
            // if(user.following){
            //    await unfollowFriend(user);
            // }else {
            const  response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/follow-friend?token=' + token +'&friendUsername='+user.username);
            if (response.data.success){
                setMessageCode(FOLLOWING);
                user.following = true ;
                //create_SSE_Connection()
            }else {
                setMessageCode(response.data.errorCode);
            }
            // }

        }else {
            console.log("token is empty")
        }
        setMessageCode(0)
    }

    const unfollowFriend = async (friend) => {
        const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/delete-friend?token=' + token + '&friendUsername=' + friend.username);
        if (response.data.success) {

            setUsersFromServer().then(r=>{})
            alert("delete");
        } else {
            alert(response.data.errorCode);
        }
    };

    return (
        <ImageBackground source={require('../images/searchFriends.gif')} style={searchFriendsStyle.background}>
            <View style={searchFriendsStyle.textTitle} >
                {(
                    <Text style={searchFriendsStyle.textHeader}>Search Friends...</Text>
                )}
            </View>
            <View>
                <View style={searchFriendsStyle.searchStyle}>

                    <TextInput
                        placeholder="Search Friends...🔎"
                        onChangeText={handleSearch}
                        value={searchFriend}
                    />
                    <Ionicons
                        name="close-circle"
                        size={24}
                        color="grey"
                        onPress={handleClearSearch}
                    />
                </View>
                <ScrollView>
                    {
                        filteredUsers.length !== 0 &&
                        filteredUsers.map((user,index) => (
                            <View key={index} style={{ flexDirection: 'row' }}>

                                <View style={searchFriendsStyle.frame}>
                                    <View style={{ marginTop:10}}>
                                        <View key={user.id} style={{ flexDirection: 'row' }}>
                                            <View style={{ marginLeft: 25 }}>
                                                <Image
                                                    source={{
                                                        uri: user.picture !== "" ? user.picture : 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
                                                    }}
                                                    style={searchFriendsStyle.image}
                                                />
                                            </View>
                                            <View >
                                                <Text style={searchFriendsStyle.username}> {user.username}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => !user.following ? followingRequest(user) : unfollowFriend(user)}>
                                                <View style={searchFriendsStyle.followingRequest}>
                                                    <SimpleLineIcons name="user-follow" size={24} color="white" style={searchFriendsStyle.followIcon} />
                                                    <Text style={searchFriendsStyle.followText}>{user.following ? "Unfollow" : "Follow"}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
                {
                    (messageCode !== 0 && !isAlertShown) &&
                    <ErrorAlert message={messageCode} />
                }
            </View>
        </ImageBackground>
    );
};

export default SearchFriends;
