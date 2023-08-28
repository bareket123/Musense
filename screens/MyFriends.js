import React, {useEffect, useState} from 'react';
import {Video} from "expo-av";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {LOCAL_SERVER_URL, setToken} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import ErrorAlert from "./ErrorAlert";


const MyFriends = ({navigation}) => {
    const [myFriends,setMyFriends]=useState([]);
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.reducer);
    const[messageCode, setMessageCode] = useState(0);



    useEffect(() => {
        fetchMyFriends().then(r => {});

    },[myFriends]);

    const fetchMyFriends = async ()=>{
        if (token!==''){
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/get-my-friends?token=' + token);
            if (response.data.success){
                setMyFriends(response.data.myFriends);
            }else {
                setMessageCode(response.data.errorCode);
            }
        }else {
            console.log(" friends: token is empty")
        }
        setMessageCode(0);
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
            {
                messageCode!==0&&
                <ErrorAlert message={messageCode}/>
            }
        </View>
    );
};

export default MyFriends;




