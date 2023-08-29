import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Fontisto, SimpleLineIcons} from '@expo/vector-icons';
import axios from "axios";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOCAL_SERVER_URL, setToken} from "../redux/actions";
import {useSelector} from "react-redux";
import ErrorAlert from "./ErrorAlert";
import {FOLLOWING} from "./Constans";
import { useFocusEffect } from '@react-navigation/native';


const SearchFriends = ({ navigation }) => {
    const [searchFriend, setSearchFriend] = useState('');
    const [foundUser,setFoundUser]=useState({});
    const [token,setToken]=useState('');
    const [messageCode, setMessageCode] = useState(0);
    const [isUserFound, setIsUserFound] = useState(false);
    const [isAlertShown, setIsAlertShown] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setSearchFriend('');
            setFoundUser({});
            setIsUserFound(false);
        }, [])
    );

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setToken(token);
            console.log("token is: " + token);
        } catch (error) {
            console.log("error in the token Home screen ",error.message);
        }
    };
    useEffect(() => {
        getToken().then(r => {console.log("use effect worked")});
    },[]);


    const handleSearch = (text) => {
        setSearchFriend(text);
    };


    const search = async () => {
        setIsAlertShown(false);
        const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/search-by-user-username?username=' + searchFriend);
        if (response.data.success) {
            setFoundUser(response.data.friendsDetailsModel);
            setIsUserFound(true);
            setMessageCode(0);
        } else {
            setIsUserFound(false);
            setMessageCode(response.data.errorCode);
            setIsAlertShown(true);
        }
        setSearchFriend("");
        setMessageCode(0);
    };


    const followingRequest = async ()=>{
        console.log("inside ")
        if (token!==''){
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/follow-friend?token=' + token +'&friendUsername='+foundUser.username);
            if (response.data.success){
                setMessageCode(FOLLOWING)
            }else {
                setMessageCode(response.data.errorCode);
            }
        }else {
            console.log("token is empty")
        }
    }


    return (
        <View>
            <View style={styles.searchStyle}>
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
                isUserFound &&
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
                            uri: foundUser.picture,
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />

                </View>
            }
            {
                messageCode !== 0 && !isAlertShown &&
                <ErrorAlert message={messageCode}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    searchStyle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 40,
        marginBottom:50,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
});

export default SearchFriends;
