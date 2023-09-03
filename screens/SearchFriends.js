import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Fontisto, SimpleLineIcons} from '@expo/vector-icons';
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
    const [foundUser,setFoundUser]=useState(null);
    const [messageCode, setMessageCode] = useState(0);
    const [isAlertShown, setIsAlertShown] = useState(false);
    const [showLogo, setShowLogo] = useState(true);
    const {token} = useSelector(state => state.reducer);

    useFocusEffect(
        React.useCallback(() => {
            setFoundUser(null)
        }, [])
    );
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
    };


    const search = async () => {
        setIsAlertShown(false);
        const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/search-by-user-username?username=' + searchFriend);
        if (response.data.success) {
            setFoundUser(response.data.friendsDetailsModel);
            const logoTimeout = setTimeout(() => {
                setShowLogo(false);
            }, 5000);

            return () => {
                clearTimeout(logoTimeout); // Clear the timeout on unmount
            };
        } else {
            setMessageCode(response.data.errorCode);
            setIsAlertShown(true);
        }
        setSearchFriend("");
        setMessageCode(0);
        setIsAlertShown(false);

    };

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
    const followingRequest = async ()=>{
        if (token!==''){
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/follow-friend?token=' + token +'&friendUsername='+foundUser.username);
            if (response.data.success){
                setMessageCode(FOLLOWING);
                //create_SSE_Connection()
            }else {
                setMessageCode(response.data.errorCode);
            }
        }else {
            console.log("token is empty")
        }
        setMessageCode(0)
    }


    return (
        <View>
            <View style={searchFriendsStyle.searchStyle}>
                <TextInput
                    placeholder="Search Friends..."
                    onChangeText={handleSearch}
                    value={searchFriend}
                />
                <TouchableOpacity onPress={search}>
                    <Fontisto name="search" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {
                foundUser!==null &&
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={followingRequest}>
                        <View style={{height: 100, width: 180, alignItems: 'center' }}>
                            <SimpleLineIcons name="user-follow" size={24} color="black" style={{ height: 30, width: 50, marginBottom: 5 }} />
                            <Text>You can start following</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{marginLeft:100}}>
                        <Text style={{height:50, width:50}}> {foundUser.username}</Text>
                    </View>
                    <Image
                        source={{
                            uri: foundUser.picture!==""?foundUser.picture:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />

                </View>

                 }
            {
               ( messageCode !== 0 && !isAlertShown)&&
                <ErrorAlert message={messageCode}/>
            }
        </View>
    );
};


export default SearchFriends;
