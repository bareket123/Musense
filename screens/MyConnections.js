import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { Entypo} from "@expo/vector-icons";
import { LOCAL_SERVER_URL} from "../redux/actions";
import { useSelector } from "react-redux";
import ErrorAlert from "./ErrorAlert";
import myConnectionsStyle from '../styles/myConnectionsStyle'
import globalStyles from "../styles/globalStyles";
import {DELETE} from "./Constans";


const MyConnections = ({ navigation }) => {
    const [myFriends, setMyFriends] = useState([]);
    const [myFollowers, setMyFollowers] = useState([]);
    const [showFollowing, setShowFollowing] = useState(true);
    const { token } = useSelector(state => state.reducer);
    const [messageCode, setMessageCode] = useState(0);

    useEffect(()=>{
        fetchMyFriends().then();
        gettingUserFollower().then()
    },[myFollowers])

    const fetchMyFriends = async () => {
        try {
                const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).get('/get-my-friends?token=' + token);
                if (response.data.success) {
                   setMyFriends(response.data.myFriends)
                } else {
                    setMessageCode(response.data.errorCode);
                }
            setMessageCode(0);
        }catch (error){
            console.log("error getting friends "+error)
        }
    }

    const deleteFriend = async (friend,status) => {
        const response = await axios.create({ baseURL: LOCAL_SERVER_URL }).post('/delete-friend?token=' + token + '&friendUsername=' + friend.username+'&deleteStatus='+status);
        console.log(response.data)
        if (response.data.success) {
            setMessageCode(DELETE);
        } else {
            setMessageCode(response.data.errorCode)
        }
    }

    const gettingUserFollower = async () => {
        try {
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/get-followers?token=' + token);
            if (response.data.success){
                setMyFollowers(response.data.followers)
            }else {
                setMessageCode(response.data.errorCode)
            }
        }catch (error){
            console.log("error getting followers "+error)
        }
    }

    const renderItem = ({ item }) => (
        <View style={myConnectionsStyle.frame}>
            <View style={{ padding: 25, flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
                <View style={{ marginLeft: 3, marginTop: -55 }}>
                    <Image
                        source={{
                            uri: item.picture !== '' ? item.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3J7fax0r25yrhXbt64ICXsKZ-Clm_txAxmw&usqp=CAU',
                        }}
                        style={myConnectionsStyle.image}
                    />
                </View>
                <Text style={myConnectionsStyle.username}>{item.username}</Text>
                <TouchableOpacity style={{ height: 50, width: 100, alignItems: 'center', marginLeft: 100 }} onPress={() => { deleteFriend(item,showFollowing?1:2).then(() => console.log("delete friend")) }} >
                    <View style={myConnectionsStyle.removeUser}>
                        <Entypo name="remove-user" size={24} color="white" style={myConnectionsStyle.removeIcon} />
                        <Text style={myConnectionsStyle.removeText}>remove user</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <ImageBackground source={require('../images/myFriends.gif')} resizeMode={'cover'} style={globalStyles.flexProp}>
                <View style={globalStyles.flexProp}>
                            <View style={globalStyles.flexProp}>
                                <View style={[globalStyles.flexProp,myConnectionsStyle.textTitle]} >
                                    {(
                                            showFollowing ?
                                                <Text style={myConnectionsStyle.textHeader}>my Friends: </Text>
                                                :
                                                <Text style={myConnectionsStyle.textHeader}>my Followers: </Text>
                                    )}
                                    <View style={myConnectionsStyle.viewNavigation}>
                                        <TouchableOpacity onPress={() => setShowFollowing(true)}>
                                            <Text style={[myConnectionsStyle.subTitles,{ textDecorationLine: showFollowing ? 'underline' : 'none' }]}>
                                                Following
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setShowFollowing(false)} style={{marginLeft:50,marginBottom:10}}>
                                            <Text style={[myConnectionsStyle.subTitles,{textDecorationLine: showFollowing ? 'none' : 'underline' }]}>
                                                Followers
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        showFollowing?
                                            myFriends.length>0?
                                        <FlatList data={myFriends} renderItem={renderItem} />
                                                :
                                                <View>
                                                    <Text style={myConnectionsStyle.noFriends}> You haven't added friends</Text>
                                                    <View style={myConnectionsStyle.customButton}>
                                                        <TouchableOpacity onPress={() => { navigation.navigate('Find Friends') }}>
                                                            <Text style={myConnectionsStyle.buttonText}>Go search for more friends</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                        :
                                            <View>
                                                {
                                                    myFollowers.length > 0 ?
                                                    <FlatList data={myFollowers} renderItem={renderItem}/>
                                                        :
                                                        <View>
                                                            <Text style={myConnectionsStyle.noFollowers}>No one's hit that follow button... yet!" 😄👤👀</Text>
                                                        </View>
                                                }
                                            </View>
                                    }
                                </View>
                            </View>
                </View>
            {
                messageCode !== 0 &&
                <ErrorAlert message={messageCode} />
            }
        </ImageBackground>
    );
};

export default MyConnections;
