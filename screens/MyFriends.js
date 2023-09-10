import React, { useEffect, useState } from 'react';
import { Video } from "expo-av";
import { FlatList, Image, ScrollView, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Entypo, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { LOCAL_SERVER_URL, setToken } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "./ErrorAlert";
import Logo from "./Logo";
import myFriendsStyle from '../styles/myFriendsStyle'
import globalStyles from "../styles/globalStyles";

const MyFriends = ({ navigation }) => {
    const [myFriends, setMyFriends] = useState([]);
    const { token } = useSelector(state => state.reducer);
    const [messageCode, setMessageCode] = useState(0);

    useEffect(() => {
        fetchMyFriends().then();
    }, [myFriends]);

    const fetchMyFriends = async () => {
        if (token !== '') {
            const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).get('/get-my-friends?token=' + token);
            if (response.data.success) {
                const uniqueUsernames = new Set();
                const filteredFriends = response.data.myFriends.filter(friend => {
                    if (!uniqueUsernames.has(friend.username)) {
                        uniqueUsernames.add(friend.username);
                        return true;
                    }
                    return false;
                });
                setMyFriends(Array.from(filteredFriends));
            } else {
                setMessageCode(response.data.errorCode);
            }
        } else {
            console.log(" friends: token is empty")
        }
        setMessageCode(0);
    }

    const deleteFriend = async (friend) => {
        const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/delete-friend?token=' + token + '&friendUsername=' + friend.username);
        if (response.data.success) {
            alert("delete")
        } else {
            alert(response.data.errorCode)
        }
    }

    const renderItem = ({ item }) => (
        <View style={myFriendsStyle.frame}>
            <View style={{ padding: 25, flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
                <View style={{ marginLeft: 3, marginTop: -55 }}>
                    <Image
                        source={{
                            uri: item.picture !== '' ? item.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3J7fax0r25yrhXbt64ICXsKZ-Clm_txAxmw&usqp=CAU',
                        }}
                        style={myFriendsStyle.image}
                    />
                </View>
                <Text style={myFriendsStyle.username}>{item.username}</Text>
                <TouchableOpacity style={{ height: 50, width: 100, alignItems: 'center', marginLeft: 100 }} onPress={() => { deleteFriend(item).then(r => console.log("delete friend")) }} >
                    <View style={myFriendsStyle.removeUser}>
                        <Entypo name="remove-user" size={24} color="white" style={myFriendsStyle.removeIcon} />
                        <Text style={myFriendsStyle.removeText}>remove user</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <ImageBackground source={require('../images/myFriends.gif')} resizeMode={'cover'} style={globalStyles.flexProp}>

                <View style={globalStyles.flexProp}>

                    {
                        myFriends.length !== 0 ?
                            <View style={globalStyles.flexProp}>
                                <View style={[globalStyles.flexProp,myFriendsStyle.textTitle]} >
                                    {(
                                        <Text style={myFriendsStyle.textHeader} >my friends: </Text>
                                    )}
                                    <FlatList data={myFriends} renderItem={renderItem} />
                                </View>
                            </View>
                            :
                            <View>
                                <Text style={myFriendsStyle.noFriends}>Looks like you haven't added any friends yet  </Text>
                                <View style={myFriendsStyle.customButton}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('Search friends') }}>
                                        <Text style={myFriendsStyle.buttonText}>Go search for more friends</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                    }
                    {
                        messageCode !== 0 &&
                        <ErrorAlert message={messageCode} />
                    }
                </View>

        </ImageBackground>
    );
};

export default MyFriends;

