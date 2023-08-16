import React, {useEffect, useState} from 'react';
import {Video} from "expo-av";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const MyFriends = ({navigation}) => {

    const [token,setToken]=useState('');
    const [myFriends,setMyFriends]=useState([]);

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setToken(token);
            console.log("token is: " + token);
        } catch (error) {
            console.log("error in the token my friends screen ",error.message);
        }
    };

    useEffect(() => {
        getToken().then(r => {console.log(" my friends use effect worked")});

    },[]);

    useEffect(() => {
        fetchMyFriends().then(r => {});

    },[myFriends]);

    const fetchMyFriends = async ()=>{
        if (token!==''){
            const response = await axios.create({baseURL: 'http://10.0.0.1:8989'}).get('/get-my-friends?token=' + token);
            if (response.data.success){
                setMyFriends(response.data.myFriends);
            }else {
                alert(response.data.errorCode)
            }
        }else {
            console.log(" friends: token is empty")
        }

    }
    const renderItem=({item})=>(
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%' }}>
            <Text style={{marginRight:20}}>{item.username}</Text>
            <Image
                source={{
                    uri: item.picture,
                }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
            />
        </View>

    )
    return (
        <View>
            {
                myFriends.length!==0?
                    <View>
                        <Text style={{fontWeight:'bold'}}>my friends: </Text>
                        <FlatList data={myFriends} renderItem={renderItem}/>
                    </View>
                    :
                    <View>
                        <Text>Looks like you haven't added any friends yet  </Text>

                    </View>

            }

        </View>
    );
};

export default MyFriends;
