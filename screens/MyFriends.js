import React, {useEffect, useState} from 'react';
import {Video} from "expo-av";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import {LOCAL_SERVER_URL, setToken} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import ErrorAlert from "./ErrorAlert";
import Logo from "./Logo";
import myFriendsStyle from '../styles/myFriendsStyle'


const MyFriends = ({navigation}) => {
    const [myFriends,setMyFriends]=useState([]);
   const {token} = useSelector(state => state.reducer);
    const[messageCode, setMessageCode] = useState(0);



    useEffect(() => {
        fetchMyFriends().then();

    },[myFriends]);

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


    const deleteFriend=async(friend) => {
        const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/delete-friend?token='+token+'&friendUsername='+friend.username);
        if (response.data.success){
            alert("delete")
        }else {
            alert(response.data.errorCode)
        }
    }
    const renderItem=({item})=>(
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%' }}>
            <Text style={{marginRight:20,  color:'white'}}>{item.username}</Text>
            <Image
                source={{
                    uri: item.picture!==''?item.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3J7fax0r25yrhXbt64ICXsKZ-Clm_txAxmw&usqp=CAU',
                }}
                style={{ width: 60, height: 60, borderRadius: 30 , marginRight:20}}
            />
            <TouchableOpacity style={{flexDirection:'column' , alignItems:'center'}} onPress={()=>{deleteFriend(item).then(r=>console.log("delete friend"))}} >
                <Entypo name="remove-user" size={24} color="white" />
                <Text  style={{ color:'white'}}>remove user</Text>
            </TouchableOpacity>

        </View>
    )

    return (
        <View>
            <View style={myFriendsStyle.container}>

            {
                myFriends.length!==0?
                    <View>
                        <Text style={{fontWeight:'bold', color:'white'}} >my friends: </Text>
                        <FlatList data={myFriends} renderItem={renderItem}/>
                    </View>
                    :
                    <View>
                        <Text style={{fontWeight:'bold', color:'white'}}>Looks like you haven't added any friends yet  </Text>

                    </View>

            }
            {
                messageCode!==0&&
                <ErrorAlert message={messageCode}/>
            }
            </View>
        </View>
    );
};

export default MyFriends;




