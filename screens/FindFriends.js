import React, { useEffect, useState } from 'react';
import { View, TextInput, ImageBackground, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import {  Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import axios from "axios";
import { LOCAL_SERVER_URL } from "../redux/actions";
import { useSelector } from "react-redux";
import ErrorAlert from "./ErrorAlert";
import {DELETE, FOLLOWING} from "./Constans";
import { useFocusEffect } from '@react-navigation/native';
import searchFriendsStyle from "../styles/searchFriendsStyle";
import globalStyles from "../styles/globalStyles";


const FindFriends = () => {
    const [searchFriend, setSearchFriend] = useState('');
    const [, setFoundUser] = useState(false);
    const [messageCode, setMessageCode] = useState(0);
    const [, setShowLogo] = useState(true);
    const { token,username } = useSelector(state => state.reducer);
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
            return user.username.toLowerCase().startsWith(text.toLowerCase())
        })
        tempFilteredUsers.length === 0 ?
            setFilteredUsers(allUsers) :
            setFilteredUsers(tempFilteredUsers)
        setFoundUser(tempFilteredUsers.length !== 0)
    }

    useEffect(() => {
        setUsersFromServer().then(() => { })
    }, [token]);

    useEffect(() => {
    }, [searchFriend, filteredUsers]);

    const setUsersFromServer = async () => {
        if (token !== '') {
            const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/get-all-Users-without-current?token=' + token);
            if (response.data.success) {
                setAllUsers(response.data.myFriends);
                setFilteredUsers(response.data.myFriends)
            } else {
                setMessageCode(response.data.errorCode)
            }
        } else {
            console.log("token is empty")
        }

    }



    const followingRequest = async (user) => {
        try {
            if (token !== '') {
                const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/follow-friend?token=' + token + '&friendUsername=' + user.username);
                if (response.data.success) {
                    setMessageCode(FOLLOWING);
                    user.following = true;
                    try {
                        await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                            subID: `${user.username}`,
                            appId: 11941,
                            appToken: '7alrGeOddFsagJZ65YfsHS',
                            title: 'Following Alert',
                            message: username+' Start Following You!!'
                        });
                    }catch (error){
                        console.log("error in send notification "+error)
                    }

                } else {
                    setMessageCode(response.data.errorCode);
                }
            } else {
                console.log("token is empty")
            }
            setMessageCode(0)

        }catch (error){
            console.log("error in following "+ error)
        }

    }

    const unfollowFriend = async (friend) => {
        const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/delete-friend?token=' + token + '&friendUsername=' + friend.username+'&deleteStatus=1');
        if (response.data.success) {
            setUsersFromServer().then(() => { });
            setMessageCode(DELETE);
        } else {
            setMessageCode(response.data.errorCode);
        }
    };

    return (
        <ImageBackground source={require('../images/searchFriends.gif')} style={globalStyles.flexProp} resizeMode={'cover'}>
            <ScrollView>
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

                        {
                            filteredUsers.length !== 0 &&
                            filteredUsers.map((user, index) => (
                                <View key={index} style={{ flexDirection: 'row',flex:1 }}>

                                    <View style={searchFriendsStyle.frame}>
                                        <View style={{ marginTop: 10 }}>
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

                    {
                        (messageCode !== 0 ) &&
                        <ErrorAlert message={messageCode} />
                    }
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default FindFriends;

